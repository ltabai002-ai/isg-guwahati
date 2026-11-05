import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";
import { AlumniDestinations } from "@/components/site/AlumniDestinations";
import { cn } from "@/lib/utils";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Brain, 
  Lightbulb, 
  Heart, 
  UserCheck, 
  FileText, 
  Download, 
  ArrowRight,
  BookOpen,
  Layers,
  MessageSquare,
  Sparkles,
  Award,
  Shapes,
  Globe,
  GraduationCap,
  MessageCircle,
  Trophy,
  Palette,
  Music,
  Compass,
  Languages,
  FlaskConical,
  Calculator,
  Landmark,
  Cpu
} from "lucide-react";

// Assets

import dayLesson from "@/assets/day-lesson.jpg";
import dayLab from "@/assets/day-lab.jpg";
import dayArrival from "@/assets/day-arrival.jpg";
import dayTheatre from "@/assets/day-theatre.jpg";
import campusImg from "@/assets/campus.jpg";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics at ISG — The Cambridge Pathway" },
      {
        name: "description",
        content:
          "A globally recognised education, from your child's first classroom to their university offer. Cambridge Early Years to A Level at International School Guwahati.",
      },
      { property: "og:title", content: "Academics at ISG — The Cambridge Pathway" },
      {
        property: "og:description",
        content: "Understanding over memorising. One continuous journey from age 3 to 19 with small classes and proven results.",
      },
    ],
  }),
  component: AcademicsPage,
});

import { JoinFamilyCta } from "@/components/site/JoinFamilyCta";

function AcademicsPage() {
  return (
    <>
      <AcademicsHero />
      <ThePromise />
      <CambridgeJourney />
      <WhyCambridgeLearner />
      <SubjectsOffered />
      <ProofResults />
      <HowWeTeach />
      <FromGuwahatiToWorld />
      <AlumniDestinations 
        eyebrow="OUR ALUMNI"
        headline="Where sixteen years have taken them."
        lead="Every journey becomes a classroom, and every new place becomes a lesson."
        groupByRegion={true}
      />
      <BeyondAcademics />
      <AffiliationsCertifications />
      <ISGPromiseBand />
      <JoinFamilyCta heading="Ready to start the Cambridge journey?" />
    </>
  );
}

/* ==========================================================================
   Hero Banner (dark navy, matching inner pages)
   ========================================================================== */
function AcademicsHero() {
  return (
    <section className="relative bg-[#111625] pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/CISG.webp"
          alt="Academics at ISG"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1329]/90 via-[#0b1329]/75 to-[#0b1329]/40" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-12">
        <Reveal>
          <p className="text-[13px] tracking-[0.2em] text-white/70 font-bold uppercase mb-4">
            ACADEMICS AT ISG
          </p>
          <h1 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] text-white font-bold leading-[1.15] max-w-4xl tracking-tight mb-4">
            Academics at ISG — the Cambridge Pathway
          </h1>
          <p className="font-sans text-[clamp(1.05rem,1.8vw,1.25rem)] text-gray-300 font-normal max-w-3xl leading-relaxed">
            A globally recognised education, from your child's first classroom to their university offer.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ==========================================================================
   Section 1 — The promise (Matching OurSchool section design from About page)
   ========================================================================== */
function ThePromise() {
  return (
    <section className="bg-sand pb-16 lg:pb-24">
      <div className="w-full">
        <div className="bg-white rounded-b-[40px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            
            {/* Text Left */}
            <div className="px-6 py-12 lg:pl-[max(3rem,calc((100vw-1300px)/2))] lg:pr-16 lg:py-20 flex flex-col justify-center">
              <Reveal>
                <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-4">
                  THE CAMBRIDGE PROMISE
                </p>
                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.2] text-[#1a1f2e] font-bold max-w-3xl">
                  We teach children to think — so they succeed long after the exam.
                </h2>
                <div className="mt-6 space-y-5 text-[15.5px] leading-relaxed text-gray-700 font-sans max-w-3xl">
                  <p>
                    The Cambridge curriculum is built around <strong className="text-maroon font-bold">understanding, not memorising</strong>. From Kindergarten to A Level, your child learns to question, analyse and connect ideas — the skills that carry them through IGCSE, A Level, and any university in the world.
                  </p>
                  <p>
                    It's an education that ends not with an exam, but with a <strong className="text-maroon font-bold">young adult ready for whatever comes next</strong>.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Photo Right with sweeping curve */}
            <div className="relative h-[350px] lg:h-full w-full">
              <Reveal delay={100} className="absolute inset-0 w-full h-full">
                <span className="hidden" dangerouslySetInnerHTML={{ __html: '<!-- replace with REAL ISG photo -->' }} />
                <img 
                  src={dayLesson} 
                  alt="Students engaged in interactive learning at ISG" 
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
   Section A — The Cambridge Journey (4 stages, official content)
   ========================================================================== */
function CambridgeJourney() {
  const stages = [
    {
      step: 1,
      title: "Primary",
      desc: "Strong foundations across core subjects, building language, curiosity and confidence through active learning.",
      icon: BookOpen,
    },
    {
      step: 2,
      title: "Lower Secondary",
      desc: "Deeper subject knowledge, growing independence, and the skills that prepare students for external examinations.",
      icon: Lightbulb,
    },
    {
      step: 3,
      title: "IGCSE / Upper Secondary",
      desc: "Globally recognised qualifications with broad subject choice and rigorous academic assessment.",
      icon: Globe,
    },
    {
      step: 4,
      title: "Cambridge Advanced (AS & A Levels)",
      desc: "Academic specialisation and preparation for universities worldwide with depth in chosen subjects.",
      icon: GraduationCap,
    },
  ];

  return (
    <section className="bg-sand py-20 lg:py-28 border-t border-b border-gray-200/60 overflow-hidden">
      <div className="mx-auto max-w-[1340px] px-6 lg:px-12">
        <Reveal className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-3">
            THE CAMBRIDGE JOURNEY
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-[#1a1f2e] font-bold leading-tight mb-4">
            From strong foundations to university preparation.
          </h2>
          <p className="font-sans text-[16px] leading-relaxed text-[#0f1423] font-medium">
            A structured progression from strong foundations to academic specialisation and university preparation.
          </p>
        </Reveal>

        {/* Desktop & Tablet Horizontal Step Flow (hidden on mobile) */}
        <div className="hidden lg:block relative mb-6">
          {/* Horizontal Connecting Line */}
          <div className="absolute top-[28px] left-[10%] right-[10%] h-[3px] bg-gray-200/80 z-0">
            <div className="h-full bg-maroon w-full rounded-full opacity-80" />
          </div>

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {stages.map((st, idx) => {
              const IconComp = st.icon;
              return (
                <Reveal key={st.step} delay={idx * 120} className="flex flex-col items-center">
                  <div className="group flex flex-col items-center w-full">
                    {/* Numbered Node Circle */}
                    <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border-2 border-maroon bg-white text-maroon font-serif font-bold text-lg shadow-md transition-all duration-300 group-hover:bg-maroon group-hover:text-white group-hover:scale-110">
                      {st.step}
                    </div>

                    {/* Stage Card */}
                    <div className="w-full h-full rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100/90 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] group-hover:border-maroon/30 flex flex-col justify-between">
                      <div>
                        {/* Icon Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-maroon/10 text-maroon transition-colors group-hover:bg-maroon group-hover:text-white">
                            <IconComp size={20} aria-hidden="true" />
                          </div>
                        </div>

                        <h3 className="font-serif text-[17px] font-bold text-[#1a1f2e] leading-snug mb-2.5">
                          {st.title}
                        </h3>
                        <p className="font-sans text-[14.5px] leading-relaxed text-[#0f1423] font-medium">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Timeline (shown on mobile & small screens) */}
        <div className="lg:hidden relative space-y-8 pl-6 sm:pl-8">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[15px] sm:left-[23px] top-4 bottom-4 w-[3px] bg-maroon/80 rounded-full z-0" />

          {stages.map((st, idx) => {
            const IconComp = st.icon;
            return (
              <Reveal key={st.step} delay={idx * 100} className="relative z-10">
                <div className="group flex items-start gap-4 sm:gap-6">
                  {/* Numbered Node Circle */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-maroon bg-white text-maroon font-serif font-bold text-base shadow-md transition-colors group-hover:bg-maroon group-hover:text-white -ml-5 sm:-ml-6 mt-1">
                    {st.step}
                  </div>

                  {/* Stage Card */}
                  <div className="w-full rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 transition-all duration-300 group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] group-hover:border-maroon/30">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-maroon/10 text-maroon">
                        <IconComp size={18} aria-hidden="true" />
                      </div>
                      <h3 className="font-serif text-[18px] font-bold text-[#1a1f2e]">
                        {st.title}
                      </h3>
                    </div>
                    <p className="font-sans text-[15px] leading-relaxed text-[#0f1423] font-medium">
                      {st.desc}
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
   Section B — Why Cambridge & The Cambridge Learner (official verbatim)
   ========================================================================== */
function WhyCambridgeLearner() {
  const attributes = [
    {
      title: "Confident",
      benefit: "Working confidently with information and ideas.",
      icon: ShieldCheck,
    },
    {
      title: "Responsible",
      benefit: "Taking responsibility for themselves and respecting others.",
      icon: UserCheck,
    },
    {
      title: "Reflective",
      benefit: "Evaluating their own learning and identifying ways to improve.",
      icon: Brain,
    },
    {
      title: "Innovative",
      benefit: "Responding creatively and constructively to new challenges.",
      icon: Lightbulb,
    },
    {
      title: "Engaged",
      benefit: "Being intellectually, socially and culturally involved in the world around them.",
      icon: Heart,
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1340px] px-6 lg:px-12">
        
        {/* Intro block */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-3">
            WHY CAMBRIDGE
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-[#1a1f2e] font-bold leading-tight mb-6">
            Cambridge Education. Global Opportunities.
          </h2>
          <p className="font-sans text-[16px] leading-relaxed text-[#0f1423] font-medium">
            Cambridge programmes encourage students to understand rather than merely remember. The curriculum develops problem-solving, investigative, critical and independent-learning skills while giving learners increasing choice and academic depth.
          </p>
        </Reveal>

        {/* Learner Attributes eyebrow */}
        <Reveal className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-3">
            THE CAMBRIDGE LEARNER
          </p>
          <h3 className="font-serif text-[clamp(1.4rem,2.5vw,1.8rem)] text-[#1a1f2e] font-bold leading-tight">
            The kind of learner your child becomes here.
          </h3>
        </Reveal>

        {/* Five attribute cards — matching homepage values-card style */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-stretch">
          {attributes.map((attr, idx) => {
            const IconComp = attr.icon;
            return (
              <Reveal key={attr.title} delay={idx * 90} className="h-full">
                <div className="group h-full rounded-2xl bg-sand/50 p-7 lg:p-8 text-center border border-gray-100/90 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_14px_35px_rgba(0,0,0,0.08)] hover:border-maroon/30 flex flex-col items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-maroon/10 text-maroon transition-colors duration-300 group-hover:bg-maroon group-hover:text-white shadow-sm">
                      <IconComp size={26} aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-[20px] font-bold text-[#1a1f2e] mb-3">
                      {attr.title}
                    </h3>
                    <p className="font-sans text-[15px] leading-relaxed text-[#0f1423] font-medium">
                      {attr.benefit}
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
   Section C — Subjects Offered (grouped cards, official lists verbatim)
   ========================================================================== */
function SubjectsOffered() {
  const groups = [
    {
      title: "Languages",
      icon: Languages,
      subjects: ["English", "French", "Assamese", "ESL (flexible options)"],
    },
    {
      title: "Sciences",
      icon: FlaskConical,
      subjects: ["Physics", "Chemistry", "Biology"],
    },
    {
      title: "Mathematics",
      icon: Calculator,
      subjects: ["Mathematics", "Further Mathematics"],
    },
    {
      title: "Humanities & Social Sciences",
      icon: Landmark,
      subjects: ["Economics", "Literature", "Global Perspectives", "Environmental Studies and related areas"],
    },
    {
      title: "Creative, Technical & Digital",
      icon: Cpu,
      subjects: ["Art & Craft", "Artificial Intelligence", "Computer Science", "Business Studies and related areas"],
    },
  ];

  return (
    <section className="bg-sand py-20 lg:py-28 border-t border-b border-gray-200/60 overflow-hidden">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-3">
            SUBJECTS OFFERED
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-[#1a1f2e] font-bold leading-tight">
            What your child studies at ISG
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {groups.map((g, idx) => {
            const IconComp = g.icon;
            return (
              <Reveal key={g.title} delay={idx * 80} className="h-full">
                <div className="group h-full rounded-2xl bg-white p-7 lg:p-8 border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-maroon/10 text-maroon transition-colors duration-300 group-hover:bg-maroon group-hover:text-white">
                      <IconComp size={22} aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-[19px] font-bold text-[#1a1f2e] leading-snug">
                      {g.title}
                    </h3>
                  </div>

                  {/* Subject list */}
                  <ul className="space-y-3 flex-1">
                    {g.subjects.map((subject, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 size={17} className="text-maroon shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="font-sans text-[15px] font-semibold text-[#0f1423] leading-snug">
                          {subject}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* CTA below subjects */}
        <Reveal delay={400} className="mt-12 text-center">
          <a
            href="https://wa.me/919435049200?text=Hello%20ISG%2C%20I%27d%20like%20to%20know%20more%20about%20the%20curriculum%20and%20subjects."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-maroon px-8 py-3.5 font-sans text-[15px] font-bold text-white shadow-md transition-all hover:bg-maroon/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Ask about subjects
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ==========================================================================
   Section 4 — Proof / results (Stat cards + subline) — KEPT AS IS
   ========================================================================== */
function ProofResults() {
  const stats = [
    { display: "1:10", label: "teacher student ratio" },
    { value: 90, suffix: "%", label: "Of alumni to top universities in India + Abroad" },
    { value: 20, prefix: "Max ", label: "Classes of max 20 (12–15 at A Level)" },
  ];

  return (
    <section className="bg-white py-20 lg:py-28 border-b border-gray-200/60">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12 text-center">
        <Reveal>
          <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-3">
            PROVEN TRACK RECORD
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-[#1a1f2e] font-bold mb-14">
            Results that open doors.
          </h2>
        </Reveal>

        {/* Count-up Stat Cards */}
        <div className="grid gap-8 sm:grid-cols-3 mb-10">
          {stats.map((st, idx) => (
            <Reveal key={st.label} delay={idx * 100}>
              <div className="rounded-2xl bg-sand/60 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100/80 text-center transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <p className="font-serif text-[clamp(2.4rem,4vw,3.2rem)] font-bold text-maroon leading-none mb-3">
                  {st.display ? st.display : <CountUp to={st.value!} {...(st.prefix ? { prefix: st.prefix } : {})} {...(st.suffix ? { suffix: st.suffix } : {})} />}
                </p>
                <p className="font-sans text-[16px] font-bold text-[#0f1423] leading-snug">
                  {st.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <p className="font-sans text-[17px] leading-relaxed text-[#0f1423] font-semibold max-w-2xl mx-auto">
            Small classes mean every child is stretched at their own level — which is exactly why our results hold up year after year.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ==========================================================================
   Section 5 — How we teach — KEPT AS IS
   ========================================================================== */
function HowWeTeach() {
  const teachingPillars = [
    {
      title: "Subject-rich curriculum",
      desc: "Broad, balanced knowledge across sciences, humanities, languages and arts.",
      icon: BookOpen,
    },
    {
      title: "Adapted to each child",
      desc: "Teaching methods tuned to how individual students learn best.",
      icon: Layers,
    },
    {
      title: "Constant, specific feedback",
      desc: "Ongoing guidance that helps students improve continuously.",
      icon: MessageSquare,
    },
    {
      title: "Questioning over rote learning",
      desc: "Encouraging deep inquiry and discussion instead of simple memorisation.",
      icon: Sparkles,
    },
    {
      title: "Calm, well-resourced environment",
      desc: "Modern labs, well-stocked libraries, and quiet study spaces.",
      icon: Award,
    },
  ];

  return (
    <section className="bg-sand py-20 lg:py-28 overflow-hidden border-t border-b border-gray-200/60">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          
          {/* List Left */}
          <Reveal>
            <div>
              <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-3">
                OPTIMAL LEARNING ENVIRONMENT
              </p>
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-[#1a1f2e] font-bold mb-8">
                How learning actually happens at ISG.
              </h2>

              <ul className="space-y-5 mb-8">
                {teachingPillars.map((p, idx) => {
                  const IconC = p.icon;
                  return (
                    <li key={idx} className="flex items-start gap-4 p-3.5 rounded-xl transition-colors hover:bg-white/60">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-maroon/10 text-maroon">
                        <IconC size={20} />
                      </div>
                      <div>
                        <h3 className="font-sans text-[17px] font-bold text-[#0f1423] mb-1">
                          {p.title}
                        </h3>
                        <p className="font-sans text-[15.5px] leading-relaxed text-[#0f1423] font-medium">
                          {p.desc}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="p-6 rounded-2xl bg-white/80 border border-maroon/20">
                <p className="font-sans text-[15.5px] leading-relaxed text-[#0f1423] font-bold">
                  As a Cambridge Direct Centre, your child even sits their board examinations right here on our own campus — familiar surroundings, less pressure.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Photo Right */}
          <Reveal delay={100} className="relative h-[380px] lg:h-[540px] w-full">
            <span className="hidden" dangerouslySetInnerHTML={{ __html: '<!-- replace with REAL ISG photo -->' }} />
            <img 
              src="/lab.webp"
              alt="Students participating in interactive science lab work at ISG" 
              className="w-full h-full object-cover rounded-tl-[80px] rounded-br-[80px] rounded-tr-2xl rounded-bl-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-4 border-white"
            />
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Section D — From Guwahati to the World
   ========================================================================== */
function FromGuwahatiToWorld() {
  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 items-center">

          {/* Photo Left */}
          <Reveal className="relative h-[360px] lg:h-[480px] w-full order-2 lg:order-1">
            <span className="hidden" dangerouslySetInnerHTML={{ __html: '<!-- replace with REAL ISG photo — students or campus with global feel -->' }} />
            <img 
              src={campusImg}
              alt="ISG students preparing for global university opportunities" 
              className="w-full h-full object-cover rounded-tr-[80px] rounded-bl-[80px] rounded-tl-2xl rounded-br-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-4 border-white"
            />
          </Reveal>

          {/* Text Right */}
          <Reveal delay={100} className="order-1 lg:order-2">
            <div>
              <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-4">
                GLOBAL PATHWAYS
              </p>
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.2] text-[#1a1f2e] font-bold max-w-xl mb-6">
                From Guwahati to the world.
              </h2>
              <div className="space-y-5 text-[15.5px] leading-relaxed text-gray-700 font-sans max-w-xl">
                <p>
                  Cambridge qualifications provide a recognised route to higher education in India and overseas. At IGCSE and Advanced Level, students gain the <strong className="text-maroon font-bold">academic depth, subject choice and independent-learning habits</strong> that support demanding university study and future careers.
                </p>
              </div>

              <Link
                to="/admissions"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-maroon px-8 py-3.5 font-sans text-[15px] font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:bg-maroon/90 hover:shadow-lg active:scale-[0.98]"
              >
                <span>Start the admissions process</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Section E — Beyond Academics (short cards)
   ========================================================================== */
function BeyondAcademics() {
  const activities = [
    {
      title: "Sports",
      desc: "Fitness, teamwork, discipline, healthy competition.",
      icon: Trophy,
    },
    {
      title: "Art & Creativity",
      desc: "Imagination, self-expression, creative confidence.",
      icon: Palette,
    },
    {
      title: "Music & Culture",
      desc: "Performance and cultural activities.",
      icon: Music,
    },
    {
      title: "Experience & Exchange",
      desc: "20+ exposure trips and opportunities to learn beyond the school environment.",
      icon: Compass,
    },
  ];

  return (
    <section className="bg-sand py-20 lg:py-28 border-t border-b border-gray-200/60">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-3">
            BEYOND ACADEMICS
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-[#1a1f2e] font-bold leading-tight">
            Learning that goes far beyond the classroom.
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {activities.map((act, idx) => {
            const IconComp = act.icon;
            return (
              <Reveal key={act.title} delay={idx * 90} className="h-full">
                <div className="group h-full rounded-2xl bg-white p-7 lg:p-8 text-center border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.08)] hover:border-maroon/30 flex flex-col items-center">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-maroon/10 text-maroon transition-colors duration-300 group-hover:bg-maroon group-hover:text-white shadow-sm">
                    <IconComp size={26} aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-[19px] font-bold text-[#1a1f2e] mb-3">
                    {act.title}
                  </h3>
                  <p className="font-sans text-[14.5px] leading-relaxed text-[#0f1423] font-medium">
                    {act.desc}
                  </p>
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
   Section 6 — Affiliations & certifications — KEPT AS IS
   ========================================================================== */
function AffiliationsCertifications() {
  return (
    <section className="bg-white py-20 lg:py-28 border-b border-gray-200/60">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-3">
            GLOBAL STANDARDS
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-[#1a1f2e] font-bold leading-tight mb-4">
            Recognised and accredited.
          </h2>
          <p className="font-sans text-[16px] leading-relaxed text-[#0f1423] font-medium">
            International School Guwahati is accredited by Cambridge Assessment International Education (CIE) — the North East's first Cambridge school, offering qualifications respected by universities in India and worldwide.
          </p>
        </Reveal>

        {/* Note about official logo */}
        {/* Note: Cambridge CIE logo — add only the official licensed logo */}
        <span className="hidden" dangerouslySetInnerHTML={{ __html: '<!-- Note: Cambridge CIE logo — add only the official licensed logo -->' }} />

        {/* High-Contrast Accreditation Statement Card */}
        <Reveal delay={100}>
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-200/80">
            <div className="bg-[#111625] px-8 py-5 text-white flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Award size={24} className="text-amber-400" />
                <h3 className="font-serif text-[17px] font-bold text-white">
                  Cambridge Assessment International Education (CIE)
                </h3>
              </div>
              <span className="text-[12.5px] font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-gray-200">
                Direct Centre
              </span>
            </div>
            
            <div className="p-8 lg:p-10 space-y-4">
              <p className="font-sans text-[16px] leading-relaxed text-[#0f1423] font-medium">
                International School Guwahati is officially registered and accredited as a <strong className="text-maroon font-bold">Cambridge Direct Centre</strong>. Our students sit their Cambridge IGCSE, AS and A Level examinations directly on our campus premises.
              </p>
              <p className="font-sans text-[15.5px] leading-relaxed text-[#0f1423] font-normal">
                Qualifications issued by Cambridge Assessment International Education are recognised and valued by leading universities, employers, and educational institutions in India and across the globe.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ==========================================================================
   Closing Band — The ISG Promise
   ========================================================================== */
function ISGPromiseBand() {
  return (
    <section className="relative bg-[#111625] py-20 lg:py-28 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <span className="hidden" dangerouslySetInnerHTML={{ __html: '<!-- replace with REAL ISG photo -->' }} />
        <img 
          src={dayLesson} 
          alt="Campus life at International School Guwahati" 
          className="w-full h-full object-cover opacity-15 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-[#0f1423]/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center">
        <Reveal>
          <p className="text-[13px] tracking-[0.2em] text-white/60 font-bold uppercase mb-4">
            THE ISG PROMISE
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-tight mb-8">
            Think deeply. Learn independently. Discover your strengths. Respect different perspectives. Embrace challenges. Prepare for a world of possibilities.
          </h2>
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
