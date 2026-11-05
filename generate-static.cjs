/**
 * Static Site Generator for ISG
 * Scrapes pages from the running dev server (for full HTML),
 * uses production CSS from .output/public/assets, and produces
 * self-contained HTML/CSS/JS files for public_html deployment.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:8080';
const DIST = path.join(__dirname, 'dist');
const BUILD_ASSETS = path.join(__dirname, '.output', 'public', 'assets');

const ROUTES = [
  { url: '/', file: 'index.html' },
  { url: '/about', file: 'about.html' },
  { url: '/admissions', file: 'admissions.html' },
  { url: '/school-life', file: 'school-life.html' },
  { url: '/news', file: 'news.html' },
  { url: '/gallery', file: 'gallery.html' },
  { url: '/pathway', file: 'pathway.html' },
  { url: '/mission-vision', file: 'mission-vision.html' },
  { url: '/faculty', file: 'faculty.html' },
  { url: '/academics', file: 'academics.html' },
  { url: '/career', file: 'career.html' },
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    http.get(url, { timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location.startsWith('http')
          ? res.headers.location
          : BASE + res.headers.location;
        return fetchPage(loc).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function findProductionCSS() {
  // Find the compiled CSS file from the build output
  if (!fs.existsSync(BUILD_ASSETS)) {
    console.error('❌ Build output not found. Running npm run build first...');
    return null;
  }
  const files = fs.readdirSync(BUILD_ASSETS);
  const cssFile = files.find(f => f.endsWith('.css'));
  if (!cssFile) {
    console.error('❌ No CSS file found in build output');
    return null;
  }
  return fs.readFileSync(path.join(BUILD_ASSETS, cssFile), 'utf-8');
}

function copyImages() {
  // Copy all image assets from build output
  const files = fs.readdirSync(BUILD_ASSETS);
  const imgDir = path.join(DIST, 'assets');
  fs.mkdirSync(imgDir, { recursive: true });

  const imageMap = {}; // maps src asset name → assets/xxx-hash.jpg

  // Read actual source files from src/assets to match correctly
  const srcAssetsDir = path.join(__dirname, 'src', 'assets');
  const srcAssets = fs.existsSync(srcAssetsDir) ? fs.readdirSync(srcAssetsDir) : [];
  // Sort srcAssets by length descending so longer names like 'hero-bg-new' match before 'hero'
  srcAssets.sort((a, b) => b.length - a.length);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.ico'].includes(ext)) {
      // Copy hashed production file to dist/assets/
      fs.copyFileSync(path.join(BUILD_ASSETS, file), path.join(imgDir, file));

      // Match against src/assets files
      const fileWithoutExt = file.replace(/\.[^/.]+$/, '');
      let matched = false;

      for (const srcFile of srcAssets) {
        const srcExt = path.extname(srcFile).toLowerCase();
        if (srcExt !== ext) continue;
        const srcBaseName = path.basename(srcFile, srcExt);

        if (fileWithoutExt === srcBaseName || fileWithoutExt.startsWith(srcBaseName + '-')) {
          imageMap[srcFile] = 'assets/' + file;
          // Also create an unhashed copy in dist/assets/ as a fallback guarantee
          fs.copyFileSync(path.join(BUILD_ASSETS, file), path.join(imgDir, srcFile));
          console.log(`  📷 ${file} → ${srcFile}`);
          matched = true;
          break;
        }
      }

      if (!matched) {
        imageMap[file] = 'assets/' + file;
      }
    }
  }
  return imageMap;
}

function processHTML(html, css, imageMap) {
  // 1. Remove all dev-only stylesheet and preload links
  html = html.replace(/<link[^>]*href="\/src\/styles\.css"[^>]*\/?>/g, '');
  html = html.replace(/<link[^>]*href="\/@tanstack-start\/[^"]*"[^>]*\/?>/g, '');
  html = html.replace(/<link[^>]*href="\/@id\/[^"]*"[^>]*\/?>/g, '');
  html = html.replace(/<link[^>]*href="@id\/[^"]*"[^>]*\/?>/g, '');

  // 2. Remove all TanStack/Vite dev scripts
  html = html.replace(/<script class="\$tsr"[\s\S]*?<\/script>/g, '');
  html = html.replace(/<script[^>]*src="[^"]*@id\/virtual[^"]*"[^>]*><\/script>/g, '');
  html = html.replace(/<script[^>]*src="\/@id\/[^"]*"[^>]*><\/script>/g, '');
  // Remove inline Vite/React hydration scripts
  html = html.replace(/<script>\s*\(self\.\$R[\s\S]*?<\/script>/g, '');

  // 3. Remove data-tsd-source debug attributes
  html = html.replace(/ data-tsd-source="[^"]*"/g, '');
  // Remove data-precedence attributes
  html = html.replace(/ data-precedence="[^"]*"/g, '');
  // Remove data-tanstack-router-dev-styles
  html = html.replace(/ data-tanstack-router-dev-styles="[^"]*"/g, '');

  // 4. Inject production CSS into <head>
  // Fix image URLs in CSS
  let fixedCss = css;
  for (const [baseName, newPath] of Object.entries(imageMap)) {
    fixedCss = fixedCss.replace(
      new RegExp(`url\\(['".]*/src/assets/${baseName.replace('.', '\\.')}['"]?\\)`, 'g'),
      `url(${newPath})`
    );
  }

  html = html.replace('</head>',
    `<style>\n${fixedCss}\n</style>\n</head>`
  );

  // 5. Ensure Google Fonts & GSAP is included
  if (!html.includes('fonts.googleapis.com/css2')) {
    html = html.replace('</head>',
      '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap">\n' +
      '</head>');
  }

  if (!html.includes('gsap.min.js')) {
    html = html.replace('</head>',
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n' +
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>\n' +
      '</head>');
  }

  // 6. Rewrite image src, href, AND inline url paths to use production asset filenames
  for (const [baseName, newPath] of Object.entries(imageMap)) {
    const srcName = baseName; // e.g. hero-bg-new.png
    const escaped = srcName.replace('.', '\\.');
    html = html.replace(
      new RegExp(`src="(/src)?/assets/${escaped}"`, 'g'),
      `src="${newPath}"`
    );
    html = html.replace(
      new RegExp(`href="(/src)?/assets/${escaped}"`, 'g'),
      `href="${newPath}"`
    );
    html = html.replace(
      new RegExp(`url\\((['"]?)(/src)?/assets/${escaped}\\1\\)`, 'g'),
      `url($1${newPath}$1)`
    );
  }

  // 7. Rewrite remaining /src/assets/ references
  html = html.replace(/src="\/src\/assets\//g, 'src="assets/');
  html = html.replace(/href="\/src\/assets\//g, 'href="assets/');
  html = html.replace(/url\((['"]?)\/src\/assets\//g, 'url($1assets/');

  // 8. Fix favicon and logo paths
  html = html.replace(/href="\/favicon\.ico"/g, 'href="favicon.ico"');
  html = html.replace(/src="\/isg-logo\.webp"/g, 'src="isg-logo.webp"');
  html = html.replace(/href="\/isg-logo\.webp"/g, 'href="isg-logo.webp"');

  // 9. Fix internal navigation links to .html files (including optional hash links and trailing slashes)
  html = html.replace(/href="\/(about|admissions|school-life|news|gallery|pathway|mission-vision|faculty|academics|career)\/?(#[^"]*)?"/g, 'href="$1.html$2"');
  html = html.replace(/href="\/"/g, 'href="index.html"');

  // 10. Add functional JS for interactive elements
  const staticJs = `
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Scroll to top
  document.querySelectorAll('[aria-label="Scroll to top"]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Scroll reveal animation
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section, [class*="reveal"]').forEach(function(el) {
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Mobile menu
  var menuBtn = document.querySelector('button[aria-label*="menu"], button[aria-label*="Menu"]');
  var mobileNav = document.getElementById('mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('hidden');
    });
    
    // Mobile menu links - close menu when a link is clicked
    var mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileNav.classList.add('hidden');
      });
    });
  }

  // Desktop Dropdown menus - close when a link is clicked (removes focus)
  var desktopDropdownLinks = document.querySelectorAll('header nav a');
  desktopDropdownLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  });

  // ==========================================
  // RESTORE REACT INTERACTIVITY IN VANILLA JS
  // ==========================================
  
  // 1. Homepage Tabs
  var tabBtns = document.querySelectorAll('button[role="tab"]');
  var tabPanels = document.querySelectorAll('div[role="tabpanel"]');
  if (tabBtns.length > 0 && tabPanels.length > 0) {
    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        // Reset all buttons
        tabBtns.forEach(function(b) {
          b.setAttribute('aria-selected', 'false');
          b.setAttribute('tabindex', '-1');
          b.className = "px-5 py-3 sm:px-6 sm:py-3.5 text-[13.5px] sm:text-[14.5px] font-sans font-bold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2 cursor-pointer bg-[#F8F6F2] text-gray-700 border border-gray-200 hover:bg-gray-100 hover:border-maroon/40";
        });
        // Set active button
        this.setAttribute('aria-selected', 'true');
        this.setAttribute('tabindex', '0');
        this.className = "px-5 py-3 sm:px-6 sm:py-3.5 text-[13.5px] sm:text-[14.5px] font-sans font-bold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2 cursor-pointer bg-maroon text-white shadow-md scale-105";
        
        // Hide all panels
        tabPanels.forEach(function(panel) {
          panel.classList.add('hidden');
        });
        // Show target panel
        var targetId = this.getAttribute('aria-controls');
        var targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.remove('hidden');
        }
      });
    });
  }

  // 2. Homepage Expanding Cards (Curriculum)
  var expandCards = document.querySelectorAll('.group.relative.w-full.h-full.rounded-2xl');
  if (expandCards.length > 0) {
    expandCards.forEach(function(card) {
      if (card.hasAttribute('aria-expanded')) {
        card.addEventListener('click', function() {
          // Collapse all other cards
          expandCards.forEach(function(c) {
            if (c !== card) {
              c.setAttribute('aria-expanded', 'false');
              c.className = "group relative w-full h-full rounded-2xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between select-none overflow-hidden border bg-white/5 hover:bg-white/[0.08] text-white border-white/10 hover:border-white/25 shadow-lg hover:-translate-y-1";
              var inner = c.querySelector('.transition-all.duration-300.overflow-hidden');
              if (inner) {
                inner.className = "transition-all duration-300 overflow-hidden max-h-0 opacity-0 mt-0 pt-0 border-t-0 border-transparent";
              }
              // fix top bar icon
              var topBar = c.querySelector('.h-1.w-12.rounded-full');
              if(topBar) topBar.className = "h-1 w-12 rounded-full transition-colors duration-300 bg-maroon";
              var topIcon = c.querySelector('.flex.h-8.w-8');
              if(topIcon) topIcon.className = "flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 bg-white/10 border-white/15 text-white group-hover:bg-white/20";
              var faintNumber = c.querySelector('span[aria-hidden="true"]');
              if(faintNumber) faintNumber.className = "font-serif font-bold text-[64px] sm:text-[76px] leading-none absolute bottom-2 right-4 pointer-events-none select-none transition-opacity duration-300 text-white/[0.05]";
              var collapsedDesc = c.querySelector('h3 + p');
              if(collapsedDesc) collapsedDesc.className = "mt-2 font-sans text-[14px] sm:text-[14.5px] leading-relaxed transition-colors duration-300 text-white/70";
            }
          });
          // Toggle this card
          var isExpanded = this.getAttribute('aria-expanded') === 'true';
          this.setAttribute('aria-expanded', !isExpanded);
          if (!isExpanded) {
            this.className = "group relative w-full h-full rounded-2xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between select-none overflow-hidden border bg-maroon text-white shadow-2xl border-maroon/80 scale-[1.01]";
            var inner = this.querySelector('.transition-all.duration-300.overflow-hidden');
            if (inner) inner.className = "transition-all duration-300 overflow-hidden max-h-[300px] opacity-100 mt-4 pt-3.5 border-t border-white/20";
            
            var topBar = this.querySelector('.h-1.w-12.rounded-full');
            if(topBar) topBar.className = "h-1 w-12 rounded-full transition-colors duration-300 bg-gold";
            var topIcon = this.querySelector('.flex.h-8.w-8');
            if(topIcon) topIcon.className = "flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 bg-white/20 border-white/30 text-white rotate-180";
            var faintNumber = this.querySelector('span[aria-hidden="true"]');
            if(faintNumber) faintNumber.className = "font-serif font-bold text-[64px] sm:text-[76px] leading-none absolute bottom-2 right-4 pointer-events-none select-none transition-opacity duration-300 text-white/15";
            var collapsedDesc = this.querySelector('h3 + p');
            if(collapsedDesc) collapsedDesc.className = "mt-2 font-sans text-[14px] sm:text-[14.5px] leading-relaxed transition-colors duration-300 text-white/90";

          } else {
            this.className = "group relative w-full h-full rounded-2xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between select-none overflow-hidden border bg-white/5 hover:bg-white/[0.08] text-white border-white/10 hover:border-white/25 shadow-lg hover:-translate-y-1";
            var inner = this.querySelector('.transition-all.duration-300.overflow-hidden');
            if (inner) inner.className = "transition-all duration-300 overflow-hidden max-h-0 opacity-0 mt-0 pt-0 border-t-0 border-transparent";
            
            var topBar = this.querySelector('.h-1.w-12.rounded-full');
            if(topBar) topBar.className = "h-1 w-12 rounded-full transition-colors duration-300 bg-maroon";
            var topIcon = this.querySelector('.flex.h-8.w-8');
            if(topIcon) topIcon.className = "flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 bg-white/10 border-white/15 text-white group-hover:bg-white/20";
            var faintNumber = this.querySelector('span[aria-hidden="true"]');
            if(faintNumber) faintNumber.className = "font-serif font-bold text-[64px] sm:text-[76px] leading-none absolute bottom-2 right-4 pointer-events-none select-none transition-opacity duration-300 text-white/[0.05]";
            var collapsedDesc = this.querySelector('h3 + p');
            if(collapsedDesc) collapsedDesc.className = "mt-2 font-sans text-[14px] sm:text-[14.5px] leading-relaxed transition-colors duration-300 text-white/70";
          }
        });
      }
    });
  }
  
  // 3. Admissions Accordion
  var accBtns = document.querySelectorAll('button[aria-controls^="step-content-"]');
  accBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var content = this.nextElementSibling;
      var icon = this.querySelector('svg');
      var isExpanded = this.getAttribute('aria-expanded') === 'true';
      var container = this.parentElement;
      
      // Collapse all others
      accBtns.forEach(function(otherBtn) {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          var otherContent = otherBtn.nextElementSibling;
          var otherContainer = otherBtn.parentElement;
          if(otherContent) {
            otherContent.classList.remove('max-h-[800px]', 'opacity-100', 'pb-7', 'lg:pb-8', 'pt-5', 'mt-4');
            otherContent.classList.add('max-h-0', 'opacity-0', 'pb-0', 'pt-0', 'mt-0', 'border-transparent');
          }
          if(otherBtn.querySelector('svg')) {
            otherBtn.querySelector('svg').style.transform = 'rotate(0deg)';
          }
          if(otherContainer) {
            otherContainer.classList.remove('border-maroon/40', 'shadow-[0_10px_30px_rgba(0,0,0,0.07)]');
            otherContainer.classList.add('border-gray-200/80', 'hover:border-maroon/30');
          }
        }
      });
      
      // Toggle this
      this.setAttribute('aria-expanded', !isExpanded);
      if (!isExpanded) {
        if(content) {
          content.classList.remove('max-h-0', 'opacity-0', 'pb-0', 'pt-0', 'mt-0', 'border-transparent');
          content.classList.add('max-h-[800px]', 'opacity-100', 'pb-7', 'lg:pb-8', 'pt-5', 'mt-4');
        }
        if(icon) icon.style.transform = 'rotate(180deg)';
        if(container) {
          container.classList.remove('border-gray-200/80', 'hover:border-maroon/30');
          container.classList.add('border-maroon/40', 'shadow-[0_10px_30px_rgba(0,0,0,0.07)]');
        }
      } else {
        if(content) {
          content.classList.remove('max-h-[800px]', 'opacity-100', 'pb-7', 'lg:pb-8', 'pt-5', 'mt-4');
          content.classList.add('max-h-0', 'opacity-0', 'pb-0', 'pt-0', 'mt-0', 'border-transparent');
        }
        if(icon) icon.style.transform = 'rotate(0deg)';
        if(container) {
          container.classList.remove('border-maroon/40', 'shadow-[0_10px_30px_rgba(0,0,0,0.07)]');
          container.classList.add('border-gray-200/80', 'hover:border-maroon/30');
        }
      }
    });
  });

  // 4. Admission Popup Form removed as it was hijacking real links.
  // The popup is now strictly an automatic timer-based modal.

  // 5. Homepage YouTube Video Controls
  var ytIframe = document.querySelector('iframe[src*="youtube.com"]');
  var playBtn = document.querySelector('button[aria-label*="Play video"], button[aria-label*="Pause video"]');
  var muteBtn = document.querySelector('button[aria-label*="Mute video audio"], button[aria-label*="Unmute video audio"]');
  
  if (ytIframe && playBtn && muteBtn) {
    var isPlaying = true;
    var isMuted = true;
    
    playBtn.addEventListener('click', function() {
      if (isPlaying) {
        ytIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play h-5 w-5 text-gold fill-gold ml-0.5"><polygon points="6 3 20 12 6 21 6 3"/></svg>';
        playBtn.setAttribute('aria-label', 'Play video');
      } else {
        ytIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause h-5 w-5 text-white"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>';
        playBtn.setAttribute('aria-label', 'Pause video');
      }
      isPlaying = !isPlaying;
    });

    muteBtn.addEventListener('click', function() {
      if (isMuted) {
        ytIframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
        muteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-2 h-5 w-5 text-emerald-400"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
        muteBtn.setAttribute('aria-label', 'Mute video audio');
      } else {
        ytIframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
        muteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-x h-5 w-5 text-gold"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>';
        muteBtn.setAttribute('aria-label', 'Unmute video audio');
      }
      isMuted = !isMuted;
    });
  }

  // 5b. Community Stories / Video Experiences Inline Player & Tabs
  var videoCards = document.querySelectorAll('.video-story-card');

  videoCards.forEach(function(card) {
    var vid = card.getAttribute('data-video-id');
    var title = card.getAttribute('data-video-title');
    var container = card.querySelector('.video-player-container');

    if (container && vid) {
      function startInlinePlay(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (container.querySelector('iframe')) return;

        // Reset any other video card currently playing
        videoCards.forEach(function(otherCard) {
          if (otherCard !== card) {
            var otherContainer = otherCard.querySelector('.video-player-container');
            if (otherContainer && otherContainer.getAttribute('data-original-html')) {
              otherContainer.innerHTML = otherContainer.getAttribute('data-original-html');
              attachPlayTrigger(otherCard);
            }
          }
        });

        // Save original preview markup
        if (!container.getAttribute('data-original-html')) {
          container.setAttribute('data-original-html', container.innerHTML);
        }

        // Mount iframe in place and autoplay
        container.innerHTML = '<iframe src="https://www.youtube.com/embed/' + vid + '?autoplay=1&rel=0" title="' + (title || 'Video Player') + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="h-full w-full border-0"></iframe>';
      }

      function attachPlayTrigger(c) {
        var trigger = c.querySelector('.video-player-container');
        if (trigger) {
          trigger.onclick = startInlinePlay;
        }
      }

      attachPlayTrigger(card);
    }
  });

  // Filter tabs for Community Stories
  var videoTabBtns = document.querySelectorAll('[data-video-tab]');
  if (videoTabBtns.length > 0 && videoCards.length > 0) {
    videoTabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var selectedTab = btn.getAttribute('data-video-tab');
        videoTabBtns.forEach(function(b) {
          b.classList.remove('bg-maroon', 'text-white', 'shadow-sm');
          b.classList.add('text-slate-600');
        });
        btn.classList.add('bg-maroon', 'text-white', 'shadow-sm');
        btn.classList.remove('text-slate-600');

        videoCards.forEach(function(card) {
          var cat = card.getAttribute('data-category');
          var wrapper = card.parentElement;
          if (selectedTab === 'all' || cat === selectedTab) {
            wrapper.style.display = '';
          } else {
            wrapper.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. Vanilla JS CountUp Animation
  var countUpElements = document.querySelectorAll('.vanilla-countup');
  if (countUpElements.length > 0) {
    // Set initial text to 0 immediately (since HTML contains the final text)
    countUpElements.forEach(function(el) {
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      el.textContent = prefix + '0' + suffix;
    });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            observer.unobserve(el);
            
            var target = parseInt(el.getAttribute('data-countup'), 10) || 0;
            var prefix = el.getAttribute('data-prefix') || '';
            var suffix = el.getAttribute('data-suffix') || '';
            var duration = 1600;
            var start = performance.now();
            
            var tick = function(now) {
              var p = Math.min((now - start) / duration, 1);
              var eased = 1 - Math.pow(1 - p, 3);
              var current = Math.max(1, Math.round(target * eased));
              el.textContent = prefix + current + suffix;
              
              if (p < 1) {
                requestAnimationFrame(tick);
              } else {
                el.textContent = prefix + target + suffix;
              }
            };
            requestAnimationFrame(tick);
          }
        });
      }, { threshold: 0.4 });
      
      countUpElements.forEach(function(el) {
        io.observe(el);
      });
    }
  }

  // 7. Alumni Carousel Navigation
  var carouselLeftBtns = document.querySelectorAll('button[aria-label="Scroll left"]');
  var carouselRightBtns = document.querySelectorAll('button[aria-label="Scroll right"]');
  
  carouselLeftBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var container = btn.parentElement.parentElement;
      if (container) {
        var scrollArea = container.querySelector('.flex.overflow-x-auto');
        if (scrollArea) {
          var amount = window.innerWidth > 768 ? 600 : 300;
          scrollArea.scrollBy({ left: -amount, behavior: 'smooth' });
        }
      }
    });
  });

  carouselRightBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var container = btn.parentElement.parentElement;
      if (container) {
        var scrollArea = container.querySelector('.flex.overflow-x-auto');
        if (scrollArea) {
          var amount = window.innerWidth > 768 ? 600 : 300;
          scrollArea.scrollBy({ left: amount, behavior: 'smooth' });
        }
      }
    });
  });

  // 8. Form to WhatsApp Integration
  var forms = document.querySelectorAll('form');
  forms.forEach(function(form) {
    // Hide the native HTML5 validation UI that prevents our JS from running if fields are missing. 
    // We will just let them send whatever they typed to WhatsApp.
    form.setAttribute('novalidate', 'true');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      var formData = new FormData(form);
      var text = "New Enquiry from Website:\\n\\n";
      
      // Attempt to find form context heading
      var heading = null;
      var contextNode = form.closest('section, .modal-content, div.max-w-2xl');
      if (contextNode) {
        var headingEl = contextNode.querySelector('h2, h3');
        if (headingEl) {
          heading = headingEl.textContent.trim();
        }
      }
      if (heading) {
        text = "*" + heading + "*\\n\\n";
      }

      var hasData = false;
      for (var pair of formData.entries()) {
        if (pair[0] && pair[1]) {
          hasData = true;
          var label = pair[0];
          
          // Try to find a human-readable label
          var inputElement = form.querySelector('[name="' + pair[0] + '"]');
          if (inputElement) {
            var labelElement = null;
            if (inputElement.id) {
              labelElement = form.querySelector('label[for="' + inputElement.id + '"]');
            }
            if (labelElement && labelElement.textContent) {
              label = labelElement.textContent.trim().replace('*', '').trim();
            } else if (inputElement.placeholder) {
              label = inputElement.placeholder.replace('*', '').trim();
            }
          }
          
          // Capitalize first letter of label if it's just the name attribute
          if (label === pair[0]) {
            label = label.charAt(0).toUpperCase() + label.slice(1);
          }
          
          text += "*" + label + "*: " + pair[1] + "\\n";
        }
      }
      
      if (!hasData) {
        text += "No details provided.";
      }
      
      var encodedText = encodeURIComponent(text);
      var whatsappUrl = "https://wa.me/919435049200?text=" + encodedText;
      window.open(whatsappUrl, '_blank');
      
      // Optional: change button text to show success temporarily
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        var originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Opening WhatsApp...';
        setTimeout(function() {
          submitBtn.innerHTML = originalText;
        }, 3000);
      }
    });
  });

  // 9. Open Enquiry Form Button Logic
  var openEnquiryBtns = document.querySelectorAll('.open-enquiry-btn');
  openEnquiryBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var container = btn.closest('.enquiry-container');
      if (container) {
        var btnWrapper = container.querySelector('.enquiry-button-wrapper');
        var formWrapper = container.querySelector('.enquiry-form-wrapper');
        
        if (btnWrapper && formWrapper) {
          btnWrapper.classList.remove('block');
          btnWrapper.classList.add('hidden');
          
          formWrapper.classList.remove('hidden');
          formWrapper.classList.add('block');
          
          // Optional: focus the first input
          var firstInput = formWrapper.querySelector('input, select, textarea');
          if (firstInput) {
            firstInput.focus();
          }
        }
      }
    });
  });

  var galleryBtns = document.querySelectorAll('button[aria-label^="Open photo"]');
  if (galleryBtns.length > 0) {
    var modalOverlay = document.createElement('div');
    modalOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(7,19,43,0.95);backdrop-filter:blur(10px);z-index:9999;display:none;align-items:center;justify-content:center;flex-direction:column;padding:20px;';
    
    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>';
    closeBtn.style.cssText = 'position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.3);border-radius:50%;cursor:pointer;padding:10px;transition:background 0.3s;z-index:10000;';
    modalOverlay.appendChild(closeBtn);
    
    var prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M15 18l-6-6 6-6"></path></svg>';
    prevBtn.style.cssText = 'position:absolute;left:20px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.3);border-radius:50%;cursor:pointer;padding:12px;display:none;z-index:10000;';
    modalOverlay.appendChild(prevBtn);
    
    var nextBtn = document.createElement('button');
    nextBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M9 18l6-6-6-6"></path></svg>';
    nextBtn.style.cssText = 'position:absolute;right:20px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.3);border-radius:50%;cursor:pointer;padding:12px;display:none;z-index:10000;';
    modalOverlay.appendChild(nextBtn);

    var imgEl = document.createElement('img');
    imgEl.style.cssText = 'max-width:90%;max-height:75vh;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.5);object-fit:contain;';
    modalOverlay.appendChild(imgEl);
    
    var titleContainer = document.createElement('div');
    titleContainer.style.cssText = 'text-align:center;margin-top:20px;max-width:800px;';
    
    var titleEl = document.createElement('h4');
    titleEl.style.cssText = 'color:white;margin:0;font-size:24px;font-family:serif;font-weight:bold;';
    titleContainer.appendChild(titleEl);
    
    var descEl = document.createElement('p');
    descEl.style.cssText = 'color:rgba(255,255,255,0.85);margin-top:8px;font-size:15px;';
    titleContainer.appendChild(descEl);
    
    var counterEl = document.createElement('div');
    counterEl.style.cssText = 'color:rgba(255,255,255,0.6);margin-top:4px;font-size:13px;';
    titleContainer.appendChild(counterEl);

    modalOverlay.appendChild(titleContainer);
    document.body.appendChild(modalOverlay);
    
    var closeModal = function() {
      modalOverlay.style.display = 'none';
      document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay || e.target === titleContainer) closeModal();
    });
    
    var currentAlbum = [];
    var currentIndex = 0;
    
    var showPhoto = function(index) {
      if (currentAlbum.length === 0) return;
      var photo = currentAlbum[index];
      imgEl.src = photo.src;
      titleEl.textContent = photo.title || photo.alt;
      descEl.textContent = photo.alt;
      
      if (currentAlbum.length > 1) {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        counterEl.textContent = 'Photo ' + (index + 1) + ' of ' + currentAlbum.length;
      } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        counterEl.textContent = '';
      }
    };
    
    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentAlbum.length - 1;
      showPhoto(currentIndex);
    });
    
    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      currentIndex = (currentIndex < currentAlbum.length - 1) ? currentIndex + 1 : 0;
      showPhoto(currentIndex);
    });
    
    document.addEventListener('keydown', function(e) {
      if (modalOverlay.style.display === 'flex') {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft' && currentAlbum.length > 1) prevBtn.click();
        if (e.key === 'ArrowRight' && currentAlbum.length > 1) nextBtn.click();
      }
    });

    galleryBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        var albumPhotos = btn.querySelectorAll('.album-photo');
        currentAlbum = [];
        
        if (albumPhotos.length > 0) {
          // It's an album!
          albumPhotos.forEach(function(p) {
            currentAlbum.push({ src: p.src, alt: p.alt, title: p.getAttribute('data-title') || '' });
          });
        } else {
          // Single photo
          var img = btn.querySelector('img:not(.album-photo)');
          if (img) {
            var h4 = btn.querySelector('h4');
            currentAlbum.push({ src: img.src, alt: img.alt, title: h4 ? h4.textContent : '' });
          }
        }
        
        if (currentAlbum.length > 0) {
          currentIndex = 0;
          showPhoto(0);
          modalOverlay.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    });
  }

  // Admission Popup Modal handlers
  var popupOverlay = document.getElementById('admission-popup-overlay');
  if (popupOverlay) {
    var dismissed = sessionStorage.getItem('isg_admission_popup_dismissed');
    if (!dismissed) {
      setTimeout(function() {
        popupOverlay.classList.remove('hidden');
        popupOverlay.style.display = 'flex';
      }, 2000);
    } else {
      popupOverlay.classList.add('hidden');
      popupOverlay.style.display = 'none';
    }

    var closeModal = function() {
      popupOverlay.classList.add('hidden');
      popupOverlay.style.display = 'none';
      sessionStorage.setItem('isg_admission_popup_dismissed', 'true');
    };

    var closeBtns = popupOverlay.querySelectorAll('button[aria-label="Close modal"]');
    closeBtns.forEach(function(b) {
      b.addEventListener('click', closeModal);
    });

    popupOverlay.addEventListener('click', function(e) {
      if (e.target === popupOverlay) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }

  // Universal Static Tab Switcher for role="tablist" (StageSelector, StageSubjects)
  document.querySelectorAll('[role="tablist"]').forEach(function(tablist) {
    var tabs = Array.from(tablist.querySelectorAll('[role="tab"], button'));
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        tabs.forEach(function(t) {
          t.setAttribute('aria-selected', 'false');
          t.classList.remove('bg-maroon', 'text-white', 'shadow-md', 'scale-105');
          t.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
        });

        tab.setAttribute('aria-selected', 'true');
        tab.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
        tab.classList.add('bg-maroon', 'text-white', 'shadow-md', 'scale-105');

        var targetId = tab.getAttribute('aria-controls');
        if (targetId) {
          var sec = tablist.closest('section') || document;
          var panels = sec.querySelectorAll('[role="tabpanel"]');
          panels.forEach(function(p) {
            if (p.id === targetId) {
              p.classList.remove('hidden');
            } else {
              p.classList.add('hidden');
            }
          });
        }
      });
    });
  });

  // ValuesExplorer Tab Switcher
  document.querySelectorAll('section').forEach(function(sec) {
    var valBtns = Array.from(sec.querySelectorAll('ul button[aria-pressed]'));
    var valPanels = Array.from(sec.querySelectorAll('.value-panel'));
    if (valBtns.length > 0 && valPanels.length > 0) {
      valBtns.forEach(function(btn, idx) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          valBtns.forEach(function(b) {
            b.setAttribute('aria-pressed', 'false');
            b.classList.remove('border-maroon', 'bg-maroon', 'text-white');
            b.classList.add('border-border', 'bg-card');
            var spanNum = b.querySelector('span');
            if (spanNum) spanNum.className = 'font-serif text-[13px] text-muted-foreground';
          });
          btn.setAttribute('aria-pressed', 'true');
          btn.classList.remove('border-border', 'bg-card');
          btn.classList.add('border-maroon', 'bg-maroon', 'text-white');
          var activeSpanNum = btn.querySelector('span');
          if (activeSpanNum) activeSpanNum.className = 'font-serif text-[13px] text-white/60';

          valPanels.forEach(function(p, pIdx) {
            if (pIdx === idx) {
              p.classList.remove('hidden');
            } else {
              p.classList.add('hidden');
            }
          });
        });
      });
    }
  });

  // CountUp animation for stat numbers
  document.querySelectorAll('[data-count]').forEach(function(el) {
    var target = parseInt(el.getAttribute('data-count'));
    var duration = 2000;
    var start = 0;
    var startTime = null;
    function animate(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(animate);
      else el.textContent = target;
    }
    var obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(animate);
        obs.unobserve(el);
      }
    });
    obs.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var id = this.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Video Play/Pause button handler for static pages
  document.querySelectorAll('button[aria-label*="campus video"]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var container = btn.closest('div');
      var video = container ? container.querySelector('video') : null;
      if (video) {
        if (video.paused) {
          video.muted = false;
          video.play();
        } else {
          video.pause();
        }
      }
    });
  });

  // GSAP ScrollTrigger for static HTML pages on desktop (>=1024px)
  if (window.gsap && window.ScrollTrigger) {
    var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      gsap.registerPlugin(ScrollTrigger);
      var mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", function() {
        var triggerEl = document.querySelector('.hidden.lg\\:block') || document.querySelector('[class*="220vh"]');
        if (triggerEl) {
          var wrapper = triggerEl.querySelector('div[style*="60vw"]') || triggerEl.querySelector('.bg-black');
          var textOverlay = triggerEl.querySelector('.pointer-events-none');
          if (wrapper) {
            var tl = gsap.timeline({
              scrollTrigger: {
                trigger: triggerEl,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                pin: true,
                anticipatePin: 1
              }
            });
            tl.to(wrapper, { width: "100vw", height: "100vh", borderRadius: "0px", ease: "none" }, 0);
            if (textOverlay) {
              tl.to(textOverlay, { opacity: 0, y: -40, ease: "none" }, 0.05);
            }
          }
        }
      });
      ScrollTrigger.refresh();
    }
  }
});
</script>`;

  html = html.replace('</body>', staticJs + '\n</body>');

  return html;
}

async function main() {
  console.log('🚀 ISG Static Site Generator');
  console.log('============================\n');

  // Step 1: Get production CSS from build output
  console.log('📦 Loading production CSS from build output...');
  const css = findProductionCSS();
  if (!css) {
    console.error('Please run "npm run build" first, then run this script again.');
    process.exit(1);
  }
  console.log(`  ✅ Production CSS loaded (${(css.length / 1024).toFixed(1)} KB)\n`);

  // Step 2: Clean and create dist
  if (fs.existsSync(DIST)) {
    const items = fs.readdirSync(DIST);
    for (const item of items) {
      try { fs.rmSync(path.join(DIST, item), { recursive: true, force: true }); }
      catch (e) { /* ignore */ }
    }
  }
  fs.mkdirSync(DIST, { recursive: true });

  // Step 3: Copy production image assets
  console.log('📷 Copying production image assets...');
  const imageMap = copyImages();
  console.log(`  ✅ ${Object.keys(imageMap).length} images copied\n`);

  // Step 4: Check dev server
  try {
    await fetchPage(BASE);
    console.log('✅ Dev server running at', BASE, '\n');
  } catch (e) {
    console.error('❌ Dev server not running at', BASE);
    console.error('   Please run "npm run dev" first.');
    process.exit(1);
  }

  // Step 5: Scrape each page and collect processed HTML in memory
  const pageResults = [];
  for (const route of ROUTES) {
    console.log(`📄 Scraping ${route.url} → ${route.file}`);
    const html = await fetchPage(BASE + route.url);
    const staticHtml = processHTML(html, css, imageMap);
    pageResults.push({ file: route.file, html: staticHtml });
    console.log(`  ✅ Scraped ${route.file} (${(staticHtml.length / 1024).toFixed(1)} KB)\n`);
  }

  // Step 6: Extract all referenced file paths from HTML
  console.log('📦 Analyzing referenced assets...');
  const referencedPaths = new Set();
  for (const page of pageResults) {
    const matches = page.html.matchAll(/(?:src|href)="([^"]*?)"|url\((?:['"]?)([^)'"]+)(?:['"]?)\)/g);
    for (const m of matches) {
      let p = m[1] || m[2];
      if (p && !p.startsWith('http') && !p.startsWith('data:') && !p.startsWith('#') &&
          !p.startsWith('mailto:') && !p.startsWith('tel:') && !p.endsWith('.html') &&
          !p.startsWith('assets/') && !p.startsWith('javascript:')) {
        try { p = decodeURIComponent(p); } catch(e) {}
        referencedPaths.add(p.startsWith('/') ? p.slice(1) : p);
      }
    }
  }
  ['favicon.ico', 'robots.txt', '_headers', 'isg-logo.webp'].forEach(f => referencedPaths.add(f));

  // Step 7: Organize paths — consolidate all images under images/
  function getOrganizedPath(refPath) {
    // Faculty/ → images/faculty/
    if (refPath.startsWith('Faculty/')) {
      return refPath.replace('Faculty/', 'images/faculty/');
    }
    // events/ → images/events/
    if (refPath.startsWith('events/')) {
      return 'images/' + refPath;
    }
    // Root-level image files → images/campus/
    const ext = path.extname(refPath).toLowerCase();
    if (!refPath.includes('/') && ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) && refPath !== 'favicon.ico') {
      return 'images/campus/' + refPath;
    }
    return refPath;
  }

  const pathReorgMap = {};
  for (const refPath of referencedPaths) {
    const newPath = getOrganizedPath(refPath);
    if (newPath !== refPath) {
      pathReorgMap[refPath] = newPath;
    }
  }

  // Rewrite paths in all HTML pages to be relative
  console.log('🔄 Reorganizing asset paths...');
  for (const page of pageResults) {
    // 1. Remove leading slash from ALL referenced paths so they work anywhere
    for (const refPath of referencedPaths) {
      page.html = page.html.replaceAll('="/' + refPath + '"', '="' + refPath + '"');
      page.html = page.html.replaceAll('url("/' + refPath + '")', 'url("' + refPath + '")');
      page.html = page.html.replaceAll('url(\'/' + refPath + '\')', 'url(\'' + refPath + '\')');
      page.html = page.html.replaceAll('url(/' + refPath + ')', 'url(' + refPath + ')');
    }
    // 2. Apply reorganization mapping
    for (const [oldPath, newPath] of Object.entries(pathReorgMap)) {
      page.html = page.html.replaceAll('="' + oldPath + '"', '="' + newPath + '"');
      page.html = page.html.replaceAll('url("' + oldPath + '")', 'url("' + newPath + '")');
      page.html = page.html.replaceAll('url(\'' + oldPath + '\')', 'url(\'' + newPath + '\')');
      page.html = page.html.replaceAll('url(' + oldPath + ')', 'url(' + newPath + ')');
    }
  }
  console.log(`  ✅ Reorganized ${Object.keys(pathReorgMap).length} asset paths\n`);

  // Step 8: Copy only referenced files to organized locations
  console.log('📦 Copying referenced public assets...');
  const publicDir = path.join(__dirname, '.output', 'public');
  let copiedCount = 0;
  if (fs.existsSync(publicDir)) {
    for (const refPath of referencedPaths) {
      // Strip query parameters or hashes for filesystem paths
      const cleanRefPath = refPath.split('?')[0].split('#')[0];
      const srcPath = path.join(publicDir, cleanRefPath);
      
      const destRefPath = pathReorgMap[refPath] || refPath;
      const cleanDestRefPath = destRefPath.split('?')[0].split('#')[0];
      const destPath = path.join(DIST, cleanDestRefPath);
      
      if (fs.existsSync(srcPath)) {
        const stat = fs.statSync(srcPath);
        if (stat.isFile()) {
          fs.mkdirSync(path.dirname(destPath), { recursive: true });
          fs.copyFileSync(srcPath, destPath);
          copiedCount++;
          const arrow = cleanDestRefPath !== cleanRefPath ? ` → ${cleanDestRefPath}` : '';
          console.log(`  📷 ${cleanRefPath}${arrow} (${(stat.size / 1024).toFixed(1)} KB)`);
        }
      }
    }
  }
  console.log(`  ✅ Copied ${copiedCount} referenced public assets\n`);

  // Step 9: Write all HTML files to dist
  for (const page of pageResults) {
    fs.writeFileSync(path.join(DIST, page.file), page.html, 'utf-8');
    console.log(`  💾 Saved ${page.file} (${(page.html.length / 1024).toFixed(1)} KB)`);
  }

  // Step 6: Create .htaccess
  const htaccess = `# ISG Static Site Configuration
DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Serve existing files/directories directly
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>

<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType text/css "access plus 1 week"
  ExpiresByType application/javascript "access plus 1 week"
</IfModule>
`;
  fs.writeFileSync(path.join(DIST, '.htaccess'), htaccess, 'utf-8');

  // Final listing
  console.log('\n✅ DONE! dist/ folder contents:');
  console.log('================================');
  listDir(DIST, '');
  console.log('\n🎉 Upload ALL contents of dist/ to your public_html directory!');
}

function listDir(dir, indent) {
  const items = fs.readdirSync(dir).sort();
  for (const item of items) {
    const fp = path.join(dir, item);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) {
      console.log(`${indent}📁 ${item}/`);
      listDir(fp, indent + '   ');
    } else {
      console.log(`${indent}📄 ${item} (${(stat.size / 1024).toFixed(1)} KB)`);
    }
  }
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
