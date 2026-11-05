import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { 
  Globe, 
  Award, 
  Users, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  Heart, 
  MessagesSquare, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";

// Assets

import dayLab from "@/assets/day-lab.jpg";
import dayLesson from "@/assets/day-lesson.jpg";

export const Route = createFileRoute("/pathway")({
  head: () => ({
    meta: [
      { title: "Why ISG — International School Guwahati" },
      {
        name: "description",
        content:
          "Discover why families choose International School Guwahati — Cambridge education, small class sizes, world-class infrastructure, and holistic development.",
      },
      { property: "og:title", content: "Why ISG — International School Guwahati" },
      {
        property: "og:description",
        content: "Nurturing growing minds to pursue higher studies with confidence through genuine knowledge and world-class Cambridge education.",
      },
    ],
  }),
  component: WhyISGPage,
});

import { JoinFamilyCta } from "@/components/site/JoinFamilyCta";

function WhyISGPage() {
  return (
    <>
      <WhyHero />
      <WhyIntro />
      <WhatWeOffer />
      <FeatureGrid />
      <JoinFamilyCta heading="See why families choose ISG." />
    </>
  );
}

/* ==========================================================================
   Hero Banner (dark navy, matching About banner style)
   ========================================================================== */
function WhyHero() {
  return (
    <section className="relative bg-[#111625] pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/CISG.webp"
          alt="ISG Campus"
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
            Why ISG
          </h1>
        </Reveal>
      </div>
    </section>
  );
}

/* ==========================================================================
   Section 1 — Intro / Purpose (Matching OurSchool section from About page)
   ========================================================================== */
function WhyIntro() {
  return (
    <section className="bg-sand pb-16 lg:pb-24">
      <div className="w-full">
        <div className="bg-white rounded-b-[40px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            
            <div className="px-6 py-12 lg:pl-[max(3rem,calc((100vw-1300px)/2))] lg:pr-16 lg:py-20 flex flex-col justify-center">
              <Reveal>
                <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-4">
                  OUR PURPOSE
                </p>
                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.2] text-[#1a1f2e] font-bold max-w-3xl">
                  Nurturing growing minds to pursue higher studies with confidence through genuine knowledge.
                </h2>
                <div className="mt-6 space-y-5 text-[15.5px] leading-relaxed text-gray-700 font-sans max-w-3xl">
                  <p>
                    International School Guwahati was set up to nurture the <strong className="text-maroon font-bold">mental, emotional, cognitive, rational and social development</strong> of a child, right from the preliminary stages of life.
                  </p>
                  <p>
                    Our purpose is to nurture growing minds to pursue higher studies with confidence — through an education built on <strong className="text-maroon font-bold">genuine knowledge</strong>, not mere information.
                  </p>
                  <p>
                    Students who want to <strong className="text-maroon font-bold">build strong careers</strong>, excel in competitive exams, or study abroad benefit deeply from an ISG education.
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

/* ==========================================================================
   Section 2 — "What we offer" (two columns: photo left, list right)
   ========================================================================== */
function WhatWeOffer() {
  const points = [
    "Focuses on a questioning spirit",
    "Extends the range of academic subjects across all major subject groups",
    "Provides quality and depth across every subject",
    "Flourishes from the inter-relationship between teaching and scholarship",
    "Enhances the ability of students to learn throughout life",
  ];

  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          
          {/* Photo Left */}
          <Reveal className="relative h-[380px] lg:h-[480px] w-full">
            <span className="hidden" dangerouslySetInnerHTML={{ __html: '<!-- Placeholder for real student classroom/campus photo -->' }} />
            <img 
              src="/aboutusphoto.webp"
              alt="Students learning in an interactive classroom setting" 
              className="w-full h-full object-cover rounded-tl-[80px] rounded-br-[80px] rounded-tr-2xl rounded-bl-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-4 border-white"
            />
          </Reveal>

          {/* List Right */}
          <Reveal delay={100}>
            <div className="lg:pl-6">
              <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-3">
                EXCELLENCE IN EDUCATION
              </p>
              <h2 className="font-serif text-[clamp(1.75rem,2.8vw,2.4rem)] leading-[1.25] text-[#1a1f2e] font-bold mb-8">
                ISG aims to offer an education that:
              </h2>
              
              <ul className="space-y-4">
                {points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-3.5 rounded-xl transition-colors hover:bg-gray-50/80">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-maroon/10 text-maroon">
                      <CheckCircle2 size={18} className="text-maroon" />
                    </div>
                    <span className="font-sans text-[16px] leading-snug text-gray-800 font-medium pt-0.5">
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Section 3 — Nine Feature Cards (3-column grid)
   ========================================================================== */
function FeatureGrid() {
  const features = [
    {
      icon: Globe,
      text: "A truly international school, where students learn to understand and appreciate different cultures and beliefs — promoting a sense of global unity.",
    },
    {
      icon: Award,
      text: "A Cambridge Direct Centre: students sit their IGCSE (Cambridge) board examinations right here on the school premises.",
    },
    {
      icon: Users,
      text: "Small classes mean continuous, personalised attention from teachers — and consistently strong results.",
    },
    {
      icon: Sparkles,
      text: "Extra-curricular activities are treated with almost as much respect as academics. Every student is encouraged to take part in at least one of the many activities on offer, for a genuinely all-round upbringing.",
    },
    {
      icon: Building2,
      text: "Best-in-class infrastructure — air-conditioned, airy classrooms, a well-stocked library, playground and continually upgraded facilities — so ISG keeps pace with the best schools worldwide.",
    },
    {
      icon: ShieldCheck,
      text: "Classes are kept small — no more than 20 students per section up to IGCSE (12–15 at AS & A Level) — so teachers truly know every child and build a real bond.",
    },
    {
      icon: Heart,
      text: "Safety and security are a hallmark of ISG. Every child is cared for with the same dedication by all staff, teachers and management — a genuine 'home away from home'.",
    },
    {
      icon: MessagesSquare,
      text: "We encourage healthy, open interaction between parents, students, teachers and management. Children are encouraged to ask even the most obvious questions, building confidence and closing any communication gap.",
    },
    {
      icon: Lightbulb,
      text: "Dedicated teachers, kept sharp through ongoing training, keep students genuinely interested. Rote learning is discouraged — teachers spend real time with students until every concept is clear.",
    },
  ];

  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-3">
            KEY ADVANTAGES
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-[#1a1f2e] font-bold leading-tight">
            What Sets International School Guwahati Apart
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <Reveal key={idx} delay={(idx % 3) * 80}>
                <div className="group h-full rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:border-maroon/20 flex flex-col justify-between">
                  <div>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-maroon/10 text-maroon transition-colors group-hover:bg-maroon group-hover:text-white">
                      <IconComponent size={26} />
                    </div>
                    <p className="font-sans text-[15.5px] leading-relaxed text-gray-700 font-normal">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Section 4 — Closing CTA (dark navy band, matching About's CTA)
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
            See why families choose ISG.
          </h2>
          <p className="font-sans text-[17px] leading-relaxed text-gray-300 max-w-2xl mx-auto mb-10">
            The best way to understand what makes ISG different is to visit on an ordinary morning.
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

