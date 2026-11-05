import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";
import { User, ArrowRight } from "lucide-react";

// Assets

import dayLesson from "@/assets/day-lesson.jpg";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Meet Our Team — Faculty & Educators at ISG" },
      {
        name: "description",
        content:
          "Meet the dedicated faculty behind every student result at International School Guwahati. Highly qualified teachers fostering academic excellence and personal growth.",
      },
      { property: "og:title", content: "Meet Our Team — Faculty at ISG" },
      {
        property: "og:description",
        content: "Our teachers are chosen for their subject expertise, dedication, and genuine care for children.",
      },
    ],
  }),
  component: FacultyPage,
});

const FACULTY_MEMBERS = [
  { name: "Alisha Ahmed", role: "Faculty Member", img: "/Faculty/Alisha-Ahmed-21st-September-1316x1536.jpg" },
  { name: "Ananya Shrivastava", role: "Faculty Member", img: "/Faculty/Ananya-Shrivastava-23-sep.jpg", position: "object-top" },
  { name: "Bipanchi Goswami", role: "Faculty Member", img: "/Faculty/Bipanchi-Goswami-.jpg" },
  { name: "Debasmita Biswas", role: "Faculty Member", img: "/Faculty/Debasmita-Biswas-14-th-feb-1152x1536.jpg" },
  { name: "Deepasmita Talukdar", role: "Faculty Member", img: "/Faculty/Deepasmita-Talukdar-.jpg" },
  { name: "Deepika kaushik", role: "Faculty Member", img: "/Faculty/Deepika-kaushik-PGT-physical-Education- (1).jpeg" },
  { name: "Deepshikha Baishya", role: "Faculty Member", img: "/Faculty/Deepshikha-Baishya-20-june.jpg (1).webp" },
  { name: "Jaspreet Kaur Lotay", role: "Faculty Member", img: "/Faculty/Jaspreet-Kaur-Lotay-26th-august-768x1365.jpg" },
  { name: "Kukima Kakati Ojha", role: "Faculty Member", img: "/Faculty/KUKIMA-KAKATI-OJHA-19th-sep.jpeg" },
  { name: "Madhusmita Das", role: "Faculty Member", img: "/Faculty/Madhusmita-Das-14th-june-768x1296.jpg" },
  { name: "Moumita Borah", role: "Faculty Member", img: "/Faculty/Moumita-Borah-14-feb-768x1365.jpg" },
  { name: "Pinaki Das", role: "Faculty Member", img: "/Faculty/Pinaki-Das6th-jan.jpg" },
  { name: "Pinki Deka", role: "Faculty Member", img: "/Faculty/Pinki-Deka-18-july.jpg" },
  { name: "Pranabi Sarma", role: "Faculty Member", img: "/Faculty/Pranabi-Sarma-18th-jan.jpg", position: "object-top" },
  { name: "Priyanka Dutta", role: "Faculty Member", img: "/Faculty/Priyanka-Dutta-26th-aug-768x1365.jpg" },
  { name: "Puja Kumari", role: "Faculty Member", img: "/Faculty/Puja-Kumar-12th-feb.jpg" },
  { name: "Ramesh Pramalik", role: "Faculty Member", img: "/Faculty/Ramesh-Pramalik-28-feb.jpg" },
  { name: "Rupam Konwar", role: "Faculty Member", img: "/Faculty/Rupam-Konwar (1).jpg" },
  { name: "Sagarika Dastidar Hatkhowa", role: "Faculty Member", img: "/Faculty/Sagarika-Dastidar-Hatkhowa-20th-jan.jpg" },
  { name: "Sunita Das", role: "Faculty Member", img: "/Faculty/Sunita-Das-30th-seo.jpg" },
];

import { JoinFamilyCta } from "@/components/site/JoinFamilyCta";

function FacultyPage() {
  return (
    <>
      <FacultyHero />
      <FacultyIntroStats />
      <FacultyGrid />
      <JoinFamilyCta heading="Come and meet our team in person." />
    </>
  );
}

/* ==========================================================================
   Hero Banner (dark navy, matching inner pages)
   ========================================================================== */
function FacultyHero() {
  return (
    <section className="relative bg-[#111625] pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/CISG.webp"
          alt="ISG Faculty & Campus"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1329]/90 via-[#0b1329]/75 to-[#0b1329]/40" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-12">
        <Reveal>
          <p className="text-[13px] tracking-[0.2em] text-white/70 font-bold uppercase mb-4">
            ABOUT ISG
          </p>
          <h1 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] text-white font-bold leading-[1.15] max-w-4xl tracking-tight">
            Meet Our Team
          </h1>
        </Reveal>
      </div>
    </section>
  );
}

/* ==========================================================================
   Section 1 — Faculty intro + stats (Matching OurSchool section from About page)
   ========================================================================== */
function FacultyIntroStats() {
  const stats = [
    { value: 45, suffix: "+", label: "Teachers" },
    { value: 14, suffix: "%", label: "Hold a PhD" },
    { value: 58, suffix: "%", label: "Hold a Master's degree" },
  ];

  return (
    <section className="bg-sand pb-16 lg:pb-24">
      <div className="w-full">
        <div className="bg-white rounded-b-[40px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            
            {/* Text Left */}
            <div className="px-6 py-12 lg:pl-[max(3rem,calc((100vw-1300px)/2))] lg:pr-16 lg:py-20 flex flex-col justify-center">
              <Reveal>
                <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-4">
                  OUR FACULTY
                </p>
                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.2] text-[#1a1f2e] font-bold max-w-3xl">
                  The teachers behind every result.
                </h2>
                <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-gray-700 font-sans max-w-3xl">
                  <p>
                    A great school is only as good as the people in front of the class. Our faculty are chosen for their <strong className="text-maroon font-bold">subject expertise</strong> and their <strong className="text-maroon font-bold">genuine care for children</strong>.
                  </p>
                  <p>
                    Kept sharp through <strong className="text-maroon font-bold">ongoing training</strong>, every child at ISG is known, challenged and supported to reach their full potential.
                  </p>
                </div>

                {/* Count-up Stat Cards */}
                <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-3xl">
                  {stats.map((st) => (
                    <div 
                      key={st.label} 
                      className="rounded-xl bg-sand/60 p-5 text-center border border-gray-100/80 transition-all hover:bg-sand"
                    >
                      <p className="font-serif text-[clamp(1.8rem,2.8vw,2.4rem)] font-bold text-maroon leading-none mb-2">
                        <CountUp to={st.value} suffix={st.suffix} />
                      </p>
                      <p className="font-sans text-[13.5px] font-semibold text-gray-800 leading-snug">
                        {st.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Photo Right with sweeping curve */}
            <div className="relative h-[350px] lg:h-full w-full">
              <Reveal delay={100} className="absolute inset-0 w-full h-full">
                <span className="hidden" dangerouslySetInnerHTML={{ __html: '<!-- Placeholder for real faculty photo -->' }} />
                <img 
                  src="/images/faculty.jpeg" 
                  alt="Faculty member teaching students in a classroom" 
                  className="w-full h-full object-cover object-center lg:rounded-tl-[160px]"
                />
              </Reveal>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Section 2 — Team grid (3-column desktop, 2-column tablet, 1-column mobile)
   ========================================================================== */
function FacultyGrid() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-3">
            DEDICATED EDUCATORS
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-[#1a1f2e] font-bold leading-tight">
            Our Academic Faculty
          </h2>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FACULTY_MEMBERS.map((member, idx) => (
            <Reveal key={member.name} delay={(idx % 3) * 60}>
              <div className="group h-full rounded-2xl bg-white p-7 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:border-maroon/20 flex flex-col items-center">
                
                {/* Square Photo */}
                <div className="relative mb-5 h-40 w-40 shrink-0 overflow-hidden rounded-xl border-4 border-sand shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
                  {member.img ? (
                    <img src={member.img} alt={member.name} className={`h-full w-full object-cover ${member.position || ''}`} />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sand to-gray-200 text-maroon/70">
                      <User size={44} />
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-serif text-[18px] font-bold text-[#1a1f2e] leading-snug mb-1">
                  {member.name}
                </h3>

                {/* Optional smaller line for role / subject */}
                {/* Placeholder for role/subject e.g. Senior Secondary Mathematics */}
                <p className="font-sans text-[13.5px] font-medium text-gray-500 tracking-wide">
                  Faculty Member
                </p>

              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Section 3 — Closing CTA (dark navy band)
   ========================================================================== */
function ClosingCTA() {
  return (
    <section className="relative bg-[#111625] py-20 lg:py-28 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={dayLesson} 
          alt="Campus life at ISG" 
          className="w-full h-full object-cover opacity-15 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-[#0f1423]/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center">
        <Reveal>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-bold leading-tight mb-6">
            Meet them in person.
          </h2>
          <p className="font-sans text-[17px] leading-relaxed text-gray-300 max-w-2xl mx-auto mb-10">
            The best way to know our teachers is to watch them teach. Book a visit and sit in on an ordinary lesson.
          </p>
          <div>
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 rounded-full bg-maroon px-9 py-4 font-sans text-[15px] font-bold text-white shadow-lg transition-all hover:bg-maroon/90 hover:scale-[1.02] active:scale-[0.98]"
            >
              Book a campus visit
              <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
