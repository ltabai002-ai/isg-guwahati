import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { 
  Users, 
  Award, 
  Heart, 
  Globe, 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2 
} from "lucide-react";

// Assets

import dayLesson from "@/assets/day-lesson.jpg";
import dayLab from "@/assets/day-lab.jpg";
import dayTheatre from "@/assets/day-theatre.jpg";
import campusImg from "@/assets/campus.jpg";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Careers at ISG — Join Our Academic Team" },
      {
        name: "description",
        content:
          "Teach where children are known by name and good teaching is genuinely valued. Explore career opportunities at International School Guwahati.",
      },
      { property: "og:title", content: "Careers at International School Guwahati" },
      {
        property: "og:description",
        content: "Become part of the North East's first Cambridge school. Small classes, competitive salary, and ongoing professional growth.",
      },
    ],
  }),
  component: CareerPage,
});

function CareerPage() {
  return (
    <>
      <CareerHero />
      <TheInvitation />
      <WhyTeachAtISG />
      <HowToApply />
      <CareerClosing />
    </>
  );
}

/* ==========================================================================
   Hero Banner (dark navy, matching inner pages)
   ========================================================================== */
function CareerHero() {
  return (
    <section className="relative bg-[#111625] pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/CISG.webp"
          alt="Careers at ISG"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1329]/90 via-[#0b1329]/75 to-[#0b1329]/40" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-12">
        <Reveal>
          <p className="text-[13px] tracking-[0.2em] text-white/70 font-bold uppercase mb-4">
            CAREERS AT ISG
          </p>
          <h1 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] text-white font-bold leading-[1.15] max-w-4xl tracking-tight mb-4">
            Careers at ISG
          </h1>
          <p className="font-sans text-[clamp(1.05rem,1.8vw,1.25rem)] text-gray-300 font-normal max-w-3xl leading-relaxed">
            Teach where children are known by name, and good teaching is genuinely valued.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ==========================================================================
   Section 1 — The invitation (Matching OurSchool section design from About page)
   ========================================================================== */
function TheInvitation() {
  return (
    <section className="bg-sand pb-16 lg:pb-24">
      <div className="w-full">
        <div className="bg-white rounded-b-[40px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            
            {/* Text Left */}
            <div className="px-6 py-12 lg:pl-[max(3rem,calc((100vw-1300px)/2))] lg:pr-16 lg:py-20 flex flex-col justify-center">
              <Reveal>
                <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-4">
                  JOIN US TODAY
                </p>
                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.2] text-[#1a1f2e] font-bold max-w-3xl">
                  Become part of the North East's first Cambridge school.
                </h2>
                <div className="mt-6 space-y-5 text-[15.5px] leading-relaxed text-gray-700 font-sans max-w-3xl">
                  <p>
                    At International School Guwahati, teachers don't just deliver a syllabus — they inspire children to reach their full potential, academically and personally.
                  </p>
                  <p>
                    If you're passionate about the next generation, you'll find <strong className="text-maroon font-bold">small classes</strong>, <strong className="text-maroon font-bold">dedicated colleagues</strong>, <strong className="text-maroon font-bold">ongoing professional development</strong>, and a school that has been setting the standard for Cambridge education in the region since 2010.
                  </p>
                  <p>
                    We offer a <strong className="text-maroon font-bold">competitive salary and benefits</strong>, a supportive and collaborative environment, and real room to grow.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Photo Right with sweeping curve */}
            <div className="relative h-[350px] lg:h-full w-full">
              <Reveal delay={100} className="absolute inset-0 w-full h-full">
                <span className="hidden" dangerouslySetInnerHTML={{ __html: '<!-- Placeholder for real classroom teaching photo -->' }} />
                <img 
                  src={dayLesson} 
                  alt="Faculty member teaching an interactive lesson" 
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
   Section 2 — Why teach at ISG (Four Cards with icons & maroon accents)
   ========================================================================== */
function WhyTeachAtISG() {
  const reasons = [
    {
      title: "Small classes, real impact",
      desc: "No more than 20 students per section, so you can actually teach every child.",
      icon: Users,
    },
    {
      title: "Professional growth",
      desc: "Ongoing training and refresher courses to keep your practice sharp.",
      icon: Award,
    },
    {
      title: "A collaborative culture",
      desc: "Supportive colleagues and leadership who back their teachers.",
      icon: Heart,
    },
    {
      title: "Cambridge experience",
      desc: "Teach an internationally recognised curriculum at an established, respected school.",
      icon: Globe,
    },
  ];

  return (
    <section className="bg-sand py-20 lg:py-28 border-t border-b border-gray-200/60">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-3">
            TEACHING AT ISG
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-[#1a1f2e] font-bold leading-tight">
            Why teach at International School Guwahati
          </h2>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <Reveal key={item.title} delay={idx * 80}>
                <div className="group h-full rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100/90 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:border-maroon/30 flex flex-col justify-between">
                  <div>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-maroon/10 text-maroon transition-colors duration-300 group-hover:bg-maroon group-hover:text-white">
                      <IconComp size={26} aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-[19px] font-bold text-[#1a1f2e] mb-3">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[15px] leading-relaxed text-[#0f1423] font-medium">
                      {item.desc}
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
   Section 3 — How to apply (Light Band + Form)
   ========================================================================== */
function HowToApply() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.position) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        
        {/* Intro Copy & Direct Email Option */}
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-3">
            APPLICATION PROCESS
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-[#1a1f2e] font-bold leading-tight mb-6">
            How to apply.
          </h2>
          <p className="font-sans text-[16px] leading-relaxed text-[#0f1423] font-medium mb-6">
            For teaching posts, a B.Ed and prior teaching experience are preferred. Salary is as per norms. To apply, send your CV and a short covering note to{" "}
            <a 
              href="mailto:principal.isg.office@gmail.com" 
              className="inline-flex items-center gap-1.5 font-bold text-maroon hover:underline underline-offset-4 decoration-maroon/40"
            >
              <Mail size={16} className="shrink-0" />
              principal.isg.office@gmail.com
            </a>
            {" "}— or use the form below and we'll be in touch.
          </p>
        </Reveal>

        {/* Application Form */}
        <Reveal delay={100} className="max-w-2xl mx-auto rounded-3xl bg-sand/50 p-8 sm:p-10 border border-gray-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
          {submitted ? (
            <div className="text-center py-8">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-maroon/10 text-maroon">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-serif text-[22px] font-bold text-[#1a1f2e] mb-2">
                Application Received!
              </h3>
              <p className="font-sans text-[15.5px] leading-relaxed text-gray-700">
                Thank you for applying to International School Guwahati. Our recruitment team will review your details and reach out shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 text-red-800 text-[14px] font-medium border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[13.5px] font-bold text-[#1a1f2e] uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[15px] text-[#0f1423] focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13.5px] font-bold text-[#1a1f2e] uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[15px] text-[#0f1423] focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                  />
                </div>

                <div>
                  <label className="block text-[13.5px] font-bold text-[#1a1f2e] uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[15px] text-[#0f1423] focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13.5px] font-bold text-[#1a1f2e] uppercase tracking-wider mb-2">
                  Position of Interest *
                </label>
                <input
                  type="text"
                  name="position"
                  required
                  placeholder="e.g. Primary Mathematics Teacher / English Faculty"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[15px] text-[#0f1423] focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                />
              </div>

              <div>
                <label className="block text-[13.5px] font-bold text-[#1a1f2e] uppercase tracking-wider mb-2">
                  Covering Note / Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Briefly tell us about your teaching experience and subject background..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[15px] text-[#0f1423] focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-8 py-4 font-sans text-[15px] font-bold text-white shadow-md transition-all hover:bg-maroon/90 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                Submit Application
                <Send size={16} />
              </button>
            </form>
          )}
        </Reveal>

      </div>
    </section>
  );
}

/* ==========================================================================
   Section 4 — Closing (Dark navy band + 3 photo row)
   ========================================================================== */
function CareerClosing() {
  const photos = [
    { img: dayLab, alt: "Students engaged in interactive laboratory work", comment: "<!-- Placeholder for campus lab photo -->" },
    { img: dayTheatre, alt: "Students performing on stage in school theatre", comment: "<!-- Placeholder for campus theatre photo -->" },
    { img: campusImg, alt: "ISG campus environment and facilities", comment: "<!-- Placeholder for campus aerial photo -->" },
  ];

  return (
    <section className="relative bg-[#111625] py-20 lg:py-28 text-white overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-12 text-center">
        <Reveal>
          <h2 className="font-serif text-[clamp(1.8rem,3.2vw,2.7rem)] font-bold leading-tight max-w-4xl mx-auto mb-14">
            Come and be part of a school that's been shaping happy, capable young people for sixteen years.
          </h2>
        </Reveal>

        {/* Row of Three Real Campus Photo Placeholders */}
        <div className="grid gap-6 sm:grid-cols-3">
          {photos.map((item, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl border-2 border-white/10 shadow-xl group">
                <span className="hidden" dangerouslySetInnerHTML={{ __html: item.comment }} />
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0f1423]/20 group-hover:bg-transparent transition-colors" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
