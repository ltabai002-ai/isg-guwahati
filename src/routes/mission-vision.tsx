import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  Compass, 
  ArrowRight 
} from "lucide-react";

// Assets

import dayLab from "@/assets/day-lab.jpg";
import campusImg from "@/assets/campus.jpg";
import dayLesson from "@/assets/day-lesson.jpg";

export const Route = createFileRoute("/mission-vision")({
  head: () => ({
    meta: [
      { title: "Mission & Vision — International School Guwahati" },
      {
        name: "description",
        content:
          "Discover the mission and vision of International School Guwahati (ISG) — empowering students with holistic education, critical thinking, and lifelong learning.",
      },
      { property: "og:title", content: "Mission & Vision — International School Guwahati" },
      {
        property: "og:description",
        content: "Nurturing mental, emotional, and cognitive growth while equipping students for academic excellence and future success.",
      },
    ],
  }),
  component: MissionVisionPage,
});

import { JoinFamilyCta } from "@/components/site/JoinFamilyCta";

function MissionVisionPage() {
  return (
    <>
      <MissionHero />
      <OurMission />
      <OurVision />
      <JoinFamilyCta heading="Give your child an education built for life." />
    </>
  );
}

/* ==========================================================================
   Hero Banner (dark navy, matching About & Why ISG banner style)
   ========================================================================== */
function MissionHero() {
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
            Mission & Vision
          </h1>
        </Reveal>
      </div>
    </section>
  );
}

/* ==========================================================================
   Section 1 — Our Mission (Matching OurSchool section from About page)
   ========================================================================== */
function OurMission() {
  const checklist = [
    "Mathematical and logical reasoning",
    "Reading and writing skills",
    "Physical co-ordination",
    "Leadership qualities",
    "Communication and comprehension skills",
    "Imaginative and analytical thinking",
    "Literary and poetic expression",
    "Empathy and interpersonal skills",
    "Independent thinking",
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
                  OUR MISSION
                </p>
                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.2] text-[#1a1f2e] font-bold max-w-3xl">
                  Inspiring a lifelong love of learning through holistic education.
                </h2>
                
                <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-gray-700 font-sans max-w-3xl">
                  <p>
                    International School Guwahati was set up to nurture the <strong className="text-maroon font-bold">mental, emotional, cognitive, rational and social development</strong> of a child, right from the preliminary stages of life.
                  </p>
                  <p>
                    Our purpose is to mould growing minds to pursue higher studies with ease, through an education built on <strong className="text-maroon font-bold">knowledge, not mere information</strong>.
                  </p>
                  <p>
                    Our aim is not just to impart knowledge, but to inspire a <strong className="text-maroon font-bold">lifelong love of learning</strong> — a holistic education that prepares students for success in every aspect of life.
                  </p>
                </div>

                {/* Two-Column Checklist */}
                <div className="mt-8 pt-6 border-t border-gray-100 max-w-3xl">
                  <p className="text-[13px] font-bold text-[#1a1f2e] uppercase tracking-wider mb-4">
                    Core Developmental Focus:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {checklist.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 size={18} className="text-maroon shrink-0 mt-0.5" />
                        <span className="font-sans text-[14.5px] leading-tight text-gray-800 font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Photo Right with sweeping curve */}
            <div className="relative h-[350px] lg:h-full w-full">
              <Reveal delay={100} className="absolute inset-0 w-full h-full">
                <span className="hidden" dangerouslySetInnerHTML={{ __html: '<!-- Placeholder for real student mission photo -->' }} />
                <img 
                  src="/DSC_3750.jpg" 
                  alt="Students working collaboratively in a laboratory setting" 
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
   Section 2 — Our Vision (off-white band, text left, photo right)
   ========================================================================== */
function OurVision() {
  const pillars = [
    {
      title: "Academic Excellence",
      description: "We prioritise the development of students' knowledge and skills across all academic subjects.",
      icon: BookOpen,
    },
    {
      title: "All-Round Development",
      description: "We nurture students' social, emotional, physical and creative growth through extracurricular activities.",
      icon: Sparkles,
    },
    {
      title: "Preparation for the Future",
      description: "We equip students with the knowledge, skills and attitudes to succeed in a rapidly changing and complex world.",
      icon: Compass,
    },
  ];

  return (
    <section className="bg-sand py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          
          {/* Text Left */}
          <Reveal>
            <div className="lg:pr-4">
              <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-3">
                OUR VISION
              </p>
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.2] text-[#1a1f2e] font-bold mb-6">
                Our Vision
              </h2>
              <p className="font-sans text-[15.5px] leading-relaxed text-gray-700 font-normal mb-8">
                Our vision is to empower students to become independent, creative thinkers who are passionate about learning and eager to make a positive impact on their communities. We create a dynamic learning environment where students are challenged to reach their full potential — supported by dedicated teachers who foster a culture of respect, collaboration and innovation. We equip them with the knowledge, skills and values to thrive in a rapidly changing world, and to contribute to a more just, equitable and sustainable society.
              </p>

              {/* Three Vision Pillars */}
              <div className="space-y-4 pt-2">
                {pillars.map((pillar, idx) => {
                  const IconComp = pillar.icon;
                  return (
                    <div 
                      key={idx} 
                      className="flex items-start gap-4 rounded-xl bg-white p-4.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100/80 transition-all hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-maroon/10 text-maroon">
                        <IconComp size={22} />
                      </div>
                      <div>
                        <h3 className="font-serif text-[16.5px] font-bold text-[#1a1f2e]">
                          {pillar.title}
                        </h3>
                        <p className="mt-1 font-sans text-[14px] leading-relaxed text-gray-600 font-normal">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </Reveal>

          {/* Real Photo Right (Mirror of Section 1) */}
          <Reveal delay={100} className="relative h-[380px] lg:h-[560px] w-full">
            <span className="hidden" dangerouslySetInnerHTML={{ __html: '<!-- Placeholder for real library/campus photo -->' }} />
            <img 
              src={campusImg} 
              alt="ISG campus environment and library facilities" 
              className="w-full h-full object-cover rounded-tr-[80px] rounded-bl-[80px] rounded-tl-2xl rounded-br-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-4 border-white"
            />
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Section 3 — Closing CTA (dark navy band, matching other pages)
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
            Give your child an education built for life.
          </h2>
          <p className="font-sans text-[17px] leading-relaxed text-gray-300 max-w-2xl mx-auto mb-10">
            Visit ISG on an ordinary morning and see our mission at work.
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
