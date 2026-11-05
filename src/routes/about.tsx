import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { AlumniDestinations } from "@/components/site/AlumniDestinations";

// Assets

import dayLesson from "@/assets/day-lesson.jpg";
import dayArrival from "@/assets/day-arrival.jpg";
import dayLab from "@/assets/day-lab.jpg";
import dayTheatre from "@/assets/day-theatre.jpg";
import campusImg from "@/assets/campus.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ISG — the North East's first Cambridge school" },
      {
        name: "description",
        content: "International School Guwahati is committed to providing a safe, nurturing environment and a world-class Cambridge education.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <AboutHero />
      <OurSchool />
      <HistoryOfSuccess />
      <AlumniDestinations 
        eyebrow="OUR ALUMNI"
        headline="Our graduates, and where they are now."
        limit={6}
        linkToAcademics={true}
      />
      <WhoWeAre />
      <NavCards />
      <ClosingCTA />
    </>
  );
}

function AboutHero() {
  return (
    <section className="relative bg-[#111625] pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/CISG.webp"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1329]/90 via-[#0b1329]/75 to-[#0b1329]/40" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-12">
        <Reveal>
          <h1 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] text-white font-bold leading-[1.15] max-w-4xl tracking-tight">
            Education with pleasure, not pressure.
          </h1>
        </Reveal>
      </div>
    </section>
  );
}

function OurSchool() {
  return (
    <section className="bg-sand pb-16 lg:pb-24">
      <div className="w-full">
        <div className="bg-white rounded-b-[40px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            
            <div className="px-6 py-12 lg:pl-[max(3rem,calc((100vw-1300px)/2))] lg:pr-16 lg:py-20 flex flex-col justify-center">
              <Reveal>
                <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-4">
                  OUR SCHOOL
                </p>
                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.2] text-[#1a1f2e] font-bold max-w-3xl">
                  Fostering curiosity and creativity in a place that lets students grow, learn, and achieve.
                </h2>
                <div className="mt-6 space-y-6 text-[15.5px] leading-relaxed text-gray-700 font-sans max-w-3xl">
                  <p>
                    We offer a <strong className="text-maroon font-bold">well-rounded education</strong> that includes not only academic subjects but also extracurricular activities such as sports, music, and art. 
                  </p>
                  <p>
                    We believe that a <strong className="text-maroon font-bold">balanced education</strong> helps students develop into well-rounded individuals who are equipped to face the challenges of the real world.
                  </p>
                </div>

                {/* Accreditation Badge */}
                <div className="mt-10 flex items-center justify-start">
                  <span className="hidden" dangerouslySetInnerHTML={{ __html: '<!-- Placeholder for accreditation logo -->' }} />
                  <div className="flex items-center gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-maroon bg-white text-maroon font-serif font-bold text-2xl shadow-sm">
                      CIE
                    </div>
                    <div className="flex flex-col border-l-2 border-gray-200 pl-5">
                      <span className="font-sans text-[16px] font-bold text-[#1a1f2e] leading-snug">
                        Cambridge International<br />Education
                      </span>
                      <span className="text-[13px] text-maroon font-semibold mt-1 uppercase tracking-wide">Accredited School</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="relative h-[350px] lg:h-full w-full">
              <Reveal delay={100} className="absolute inset-0 w-full h-full">
                <span className="hidden" dangerouslySetInnerHTML={{ __html: '<!-- Placeholder for real student photo -->' }} />
                <img 
                  src="/aboutusphoto.webp" 
                  alt="Students engaging in a classroom activity" 
                  className="w-full h-full object-cover lg:rounded-tl-[160px]"
                />
              </Reveal>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function HistoryOfSuccess() {
  const stats = [
    { display: "1:10", label: "teacher student ratio" },
    { to: 90, suffix: "%", label: "of alumni to top universities in India + Abroad" },
    { to: 16, suffix: "+", label: "Years as the North East's first Cambridge school" },
  ];

  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-[1100px] px-5 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <p className="text-[12px] tracking-[0.2em] text-maroon font-bold uppercase mb-4">
              SIXTEEN YEARS OF EXCELLENCE
            </p>
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-[#1a1f2e] font-bold">
              History of Success
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-[#0f1423] font-medium">
              International School Guwahati is the region's first and oldest Cambridge school — founded in 2010 by NR Education Foundation as the North East's gateway to a globally recognised education. From Kindergarten to A Level, our teachers have taught the full pathway for sixteen years, with results that speak plainly and passed-out students studying across four continents.
            </p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {stats.map((st, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-border/40 text-center">
                <div className="font-serif text-5xl lg:text-6xl text-maroon font-bold mb-3 flex items-center justify-center">
                  {st.display ? st.display : <CountUp to={st.to!} suffix={st.suffix} />}
                </div>
                <p className="text-[15px] font-bold text-[#0f1423] leading-snug">{st.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Extended Historical Proof & Faculty Pillars */}
        <Reveal delay={150}>
          <div className="mt-14 bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-border/40">
            <h3 className="font-serif text-2xl font-bold text-navy mb-6">
              Why families choose the region's established school
            </h3>
            <ul className="grid gap-5 sm:grid-cols-2 text-[15.5px] leading-relaxed text-gray-700">
              <li className="flex gap-3 items-start">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-maroon" aria-hidden="true" />
                <span><strong className="text-navy font-bold">Founded 2010:</strong> The region's first and oldest Cambridge school, established by NR Education Foundation.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-maroon" aria-hidden="true" />
                <span><strong className="text-navy font-bold">Senior Faculty:</strong> 45+ dedicated teachers, 14% holding a PhD and 58% holding a Master's degree.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-maroon" aria-hidden="true" />
                <span><strong className="text-navy font-bold">Proven Outcomes:</strong> Published plainly with 63% A*–B grades achieved at IGCSE.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-maroon" aria-hidden="true" />
                <span><strong className="text-navy font-bold">Global Alumni:</strong> An active alumni community spread across four continents — and still in touch.</span>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhoWeAre() {
  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden" id="mission">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          
          <Reveal className="order-2 lg:order-1 relative h-[400px] lg:h-[500px]">
            <span className="hidden" dangerouslySetInnerHTML={{ __html: '<!-- Placeholder for real student photo -->' }} />
            <img 
              src={dayArrival} 
              alt="Students arriving at school" 
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
          </Reveal>

          <Reveal delay={100} className="order-1 lg:order-2">
            <div>
              <p className="text-[12px] tracking-[0.2em] text-maroon font-bold uppercase mb-4">
                WHO WE ARE
              </p>
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.2] text-navy font-bold">
                Our Vision & Value.
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-foreground/80 font-sans">
                We understand that you want the best for your child's education, and we promise to provide just that. ISG is committed to providing a safe and nurturing environment for your child to learn and grow.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function NavCards() {
  const cards = [
    {
      title: "Why ISG",
      link: "/",
      hash: "trust",
      img: "/aboutusphoto.webp",
    },
    {
      title: "Mission & Vision",
      link: "/about",
      hash: "mission",
      img: dayLab,
    },
    {
      title: "Faculty",
      link: "#",
      hash: "",
      note: "45+ teachers · 14% PhD · 58% Master's",
      img: dayTheatre,
    },
  ];

  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 100}>
              <Link
                to={card.link}
                hash={card.hash || undefined}
                className="group relative block h-[350px] w-full overflow-hidden rounded-2xl shadow-lg"
              >
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy/40 transition-colors duration-300 group-hover:bg-navy/50" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="font-serif text-3xl text-white font-bold mb-2">{card.title}</h3>
                  {card.note && (
                    <p className="text-white/90 text-sm font-semibold">{card.note}</p>
                  )}
                  <div className="mt-4 flex items-center text-white/80 group-hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">
                    Explore <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="bg-navy py-20 lg:py-28 overflow-hidden" id="enquiry">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 items-start">
          
          <Reveal>
            <div className="pt-4">
              <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] leading-[1.15] text-white font-bold">
                Choose the best education for your child. Start today!
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-white/80 font-sans">
                Get set to change the way you look at schools! International School Guwahati offers international education right from the Kindergarten level to the globally accepted Cambridge 'IGCSE' and 'A' level qualifications (Senior Secondary). It is the North East's oldest and largest Cambridge-affiliated school — a gateway to a global learning community.
              </p>
              <button
                onClick={() => {
                  const form = document.querySelector('#enquiry form');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth' });
                    (form.querySelector('input') as HTMLElement)?.focus();
                  }
                }}
                className="mt-10 inline-block rounded-full bg-maroon px-8 py-4 text-[15px] font-bold tracking-wide text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-maroon/90 shadow-lg"
              >
                Contact us
              </button>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl">
              <h3 className="font-serif text-2xl text-navy font-bold mb-6">How may we help you?</h3>
              <EnquiryForm />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
