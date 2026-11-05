import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ALUMNI_DATA } from "@/data/alumni";
import { cn } from "@/lib/utils";

interface AlumniDestinationsProps {
  eyebrow: string;
  headline: string;
  lead?: string;
  limit?: number;
  expandable?: boolean;
  linkToAcademics?: boolean;
  hideNames?: boolean;
  groupByRegion?: boolean;
}

function AlumniCarouselRow({ 
  alumni, 
  renderCard 
}: { 
  alumni: any[], 
  renderCard: (alumnus: any, idx: number) => React.ReactNode 
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 600 : 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/carousel">
      {/* Left button */}
      <div className="absolute left-0 top-0 bottom-8 w-16 md:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 flex items-center justify-start opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none -ml-5 lg:-ml-8">
        <button 
          onClick={() => scroll('left')} 
          className="pointer-events-auto h-10 w-10 md:h-12 md:w-12 ml-2 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-primary hover:bg-gray-50 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 -mx-5 px-5 lg:-mx-8 lg:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {alumni.map((alumnus, idx) => (
          <Reveal key={`${alumnus.name}-${idx}`} delay={idx * 50} className="flex-shrink-0 w-[85vw] sm:w-[320px] md:w-[350px] lg:w-[380px] snap-start h-auto">
            {renderCard(alumnus, idx)}
          </Reveal>
        ))}
      </div>

      {/* Right button */}
      <div className="absolute right-0 top-0 bottom-8 w-16 md:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 flex items-center justify-end opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none -mr-5 lg:-mr-8">
        <button 
          onClick={() => scroll('right')} 
          className="pointer-events-auto h-10 w-10 md:h-12 md:w-12 mr-2 md:mr-4 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-primary hover:bg-gray-50 transition-colors animate-pulse md:animate-none"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
}

export function AlumniDestinations({
  eyebrow,
  headline,
  lead,
  limit,
  expandable = false,
  linkToAcademics = false,
  hideNames = false,
  groupByRegion = false,
}: AlumniDestinationsProps) {
  const [expanded, setExpanded] = useState(false);

  const displayedAlumni = (expandable && !expanded) || (limit && !expandable) 
    ? ALUMNI_DATA.slice(0, limit || 9)
    : ALUMNI_DATA;

  // Render a single card
  const renderCard = (alumnus: typeof ALUMNI_DATA[0], idx: number) => {
    const initial = alumnus.name ? alumnus.name.charAt(0).toUpperCase() : "?";
    
    return (
      <div 
        key={`${alumnus.name}-${idx}`} 
        className="group flex flex-col rounded-2xl bg-white overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full"
      >
        <div className="relative w-full overflow-hidden bg-sand border-b border-gray-100 flex items-center justify-center" style={{ height: '220px' }}>
          {alumnus.photo ? (
              <img 
              src={alumnus.photo} 
              alt={`${alumnus.name}, alumnus now at ${alumnus.university}`}
              loading="lazy"
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: alumnus.imagePosition || 'center' }}
            />
          ) : (
            <div className="w-full flex items-center justify-center h-full">
              <span className="hidden" dangerouslySetInnerHTML={{ __html: `<!-- add real photo for ${alumnus.name} -->` }} />
              <span className="font-serif text-3xl font-bold text-maroon">{initial}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col p-6">
          <div className="w-6 h-1 bg-maroon rounded-full mb-3" />
          {!hideNames && (
            <p className="font-sans text-[15px] font-bold text-primary mb-1">
              {alumnus.name}
            </p>
          )}
          <p className="font-sans text-[13.5px] text-slate-500 leading-snug">
            {alumnus.university}, {alumnus.country}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="alumni" className="py-14 lg:py-20 bg-white">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-maroon uppercase mb-3">
              {eyebrow}
            </p>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-bold leading-tight text-primary">
              {headline}
            </h2>
            {lead && (
              <p className="mt-4 font-sans text-[16px] leading-relaxed text-slate-600">
                {lead}
              </p>
            )}
          </div>
        </Reveal>

        {groupByRegion && (!limit || expanded) ? (
          <div className="space-y-12">
            {["UK & Europe", "North America", "Asia & Singapore", "India"].map((region) => {
              const regionAlumni = displayedAlumni.filter(a => a.group === region);
              if (regionAlumni.length === 0) return null;
              
              return (
                <div key={region}>
                  <Reveal>
                    <h3 className="font-sans text-[18px] md:text-[22px] font-bold tracking-wider text-primary uppercase mb-6 border-b border-gray-200 pb-3">
                      {region}
                    </h3>
                  </Reveal>
                  <AlumniCarouselRow alumni={regionAlumni} renderCard={renderCard} />
                </div>
              );
            })}
          </div>
        ) : (
          <AlumniCarouselRow alumni={displayedAlumni} renderCard={renderCard} />
        )}

        <div className="mt-12 flex justify-center gap-4">
          {expandable && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center justify-center rounded-full bg-sand px-6 py-3 font-sans text-[14px] font-bold text-primary shadow-sm transition-all hover:bg-gray-200"
              style={{ minWidth: "160px" }}
            >
              {expanded ? "Show Less" : "See More"}
            </button>
          )}

          {linkToAcademics && (
            <Link
              to="/academics"
              hash="alumni"
              className="inline-flex items-center justify-center rounded-full bg-maroon px-6 py-3 font-sans text-[14px] font-bold text-white shadow-sm transition-all hover:bg-maroon/90"
            >
              See all destinations
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
