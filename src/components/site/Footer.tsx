import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0f2e60] py-12 relative overflow-hidden">
      {/* Faint blue background pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10c0-5 5-5 5-5s5 0 5 5-5 5-5 5-5 0-5-5z' fill='%23ffffff' fill-opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />
      
      {/* White container */}
      <div className="relative mx-auto bg-white rounded-[32px] px-8 pt-16 pb-8 lg:px-16 lg:pt-24 lg:pb-12 mx-4 md:mx-8 lg:mx-auto max-w-[1400px] flex flex-col min-h-[350px] shadow-2xl overflow-hidden">
        
        {/* Faint white background pattern on the right side */}
        <div 
          className="absolute inset-y-0 right-0 w-1/2 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h200v200H0z' fill='none'/%3E%3Cpath d='M50 50l100 100M150 50L50 150' stroke='%23000' stroke-width='4'/%3E%3C/svg%3E")`,
            backgroundSize: '300px 300px'
          }}
        />

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full pb-16 relative z-10">
          {/* Left Side */}
          <div className="flex flex-col mb-12 md:mb-0">
             <img 
               src="/images/ISG LOGO.jpg" 
               alt="ISG Logo" 
               className="h-[120px] w-auto object-contain mb-6"
             />
          </div>

          {/* Right Side */}
          <div className="flex flex-col text-right w-full md:w-auto">
            {/* Social Icons */}
            <div className="flex gap-5 mb-10 justify-end">
              <a href="#" className="text-[#0f2e60] hover:text-blue-700 transition-colors">
                <Facebook size={20} strokeWidth={2.5} />
              </a>
              <a href="#" className="text-[#0f2e60] hover:text-blue-700 transition-colors">
                <Instagram size={20} strokeWidth={2.5} />
              </a>
              <a href="#" className="text-[#0f2e60] hover:text-blue-700 transition-colors">
                <Linkedin size={20} strokeWidth={2.5} />
              </a>
              <a href="#" className="text-[#0f2e60] hover:text-blue-700 transition-colors">
                <Youtube size={20} strokeWidth={2.5} />
              </a>
              <a href="#" className="text-[#0f2e60] hover:text-blue-700 transition-colors">
                {/* Custom TikTok SVG */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>

            {/* Address */}
          <p className="text-[#333333] text-[15px] mb-6 max-w-[500px] ml-auto leading-relaxed">
            Nalapara, Kalimandir Path, Sarusajai P.O Saukuchi,<br />
            Guwahati-781040, Assam
          </p>
          
          {/* Contact Details */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-[#333333] justify-end">
            <span>Tel : <a href="tel:+918099367343" className="hover:text-[#0f2e60] transition-colors">+91 80993 67343</a></span>
            <span>Tel : <a href="tel:+919181119796" className="hover:text-[#0f2e60] transition-colors">+91 91811 19796</a></span>
            <span>Email : <a href="mailto:info@internationalschoolguwahati.com" className="hover:text-[#0f2e60] transition-colors underline underline-offset-4 decoration-gray-300">info@internationalschoolguwahati.com</a></span>
          </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-200 relative z-10"></div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col md:flex-row justify-between items-end pt-10 pb-8 relative z-10 pr-[80px]">
           <div className="mb-6 md:mb-0">
             <img 
               src="/images/NEW CAMBRIDGE LOGO.png" 
               alt="Cambridge Logo" 
               className="h-[65px] w-auto object-contain opacity-90"
             />
           </div>
           <div className="flex flex-col items-end">
             <div className="flex flex-wrap justify-end items-center gap-x-3 gap-y-2 text-[13px] text-[#4a4a4a] mb-5">
               <a href="#" className="hover:text-[#0f2e60] transition-colors">Contact Us</a>
               <span className="text-gray-300">|</span>
               <a href="#" className="hover:text-[#0f2e60] transition-colors">Child Safeguarding</a>
               <span className="text-gray-300">|</span>
               <a href="#" className="hover:text-[#0f2e60] transition-colors">PDPA Notices</a>
               <span className="text-gray-300">|</span>
               <a href="#" className="hover:text-[#0f2e60] transition-colors">Whistleblower Notice</a>
               <span className="text-gray-300">|</span>
               <a href="#" className="hover:text-[#0f2e60] transition-colors">Website Terms & Conditions</a>
               <span className="text-gray-300">|</span>
               <a href="#" className="hover:text-[#0f2e60] transition-colors">Accessibility</a>
               <span className="text-gray-300">|</span>
               <a href="#" className="hover:text-[#0f2e60] transition-colors">Site Map</a>
             </div>
             <p className="text-[12.5px] text-[#666666] text-right">
               Public text content may be indexed for discovery. Images and media may not be used for AI training or scraping.
             </p>
           </div>
        </div>

        {/* TOP Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute bottom-0 right-0 bg-[#ffd100] hover:bg-[#e6bd00] transition-colors w-24 h-24 rounded-tl-[80px] flex flex-col items-center justify-center pt-8 pl-8 z-20 cursor-pointer"
          aria-label="Scroll to top"
        >
           <span className="transform -rotate-90 text-[#0f2e60] font-bold tracking-widest text-[13px] flex items-center gap-1.5 ml-2">
             <span>&rarr;</span> TOP
           </span>
        </button>

      </div>
    </footer>
  );
}

