import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { cn } from "@/lib/utils";
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight,
  Info
} from "lucide-react";

// Assets


export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions at ISG — Enquiry to Enrolment in Six Simple Steps" },
      {
        name: "description",
        content:
          "Admissions open in October for an April start at International School Guwahati. Enquiry, campus tour, assessment, interview, offer, and enrolment.",
      },
      { property: "og:title", content: "Admissions at International School Guwahati" },
      {
        property: "og:description",
        content: "Six personal and transparent steps from your first enquiry to your child's first morning.",
      },
    ],
  }),
  component: AdmissionsPage,
});

import { JoinFamilyCta } from "@/components/site/JoinFamilyCta";

function AdmissionsPage() {
  return (
    <>
      <AdmissionsHero />
      <AdmissionProcess />
      <EnquirySection />
      <JoinFamilyCta heading="Take the next step." />
    </>
  );
}

/* ==========================================================================
   Hero Banner (dark navy, matching inner pages)
   ========================================================================== */
function AdmissionsHero() {
  return (
    <section className="relative bg-[#111625] pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/CISG.webp"
          alt="Admissions at ISG"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1329]/90 via-[#0b1329]/75 to-[#0b1329]/40" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-12">
        <Reveal>
          <p className="text-[13px] tracking-[0.2em] text-white/70 font-bold uppercase mb-4">
            JOINING ISG
          </p>
          <h1 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] text-white font-bold leading-[1.15] max-w-4xl tracking-tight mb-4">
            Admissions at ISG
          </h1>
          <p className="font-sans text-[clamp(1.05rem,1.8vw,1.25rem)] text-gray-300 font-normal max-w-3xl leading-relaxed">
            Six personal and transparent steps from your first enquiry to your child's first morning.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ==========================================================================
   Admission Process Section (Expandable Accordion Stack)
   ========================================================================== */
function AdmissionProcess() {
  // Step 1 open by default (index 0)
  const [openSteps, setOpenSteps] = useState<Record<number, boolean>>({ 0: true });

  const toggleStep = (index: number) => {
    setOpenSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const stepsData = [
    {
      num: "01",
      title: "Enquiry",
      bullets: [
        "Get in touch by phone, WhatsApp, or by filling in our enquiry form.",
        "Speak with our friendly admissions team about your child and your questions.",
        "Request a copy of the admission form.",
      ],
      actions: (
        <div className="flex flex-wrap gap-3.5 mt-6 pt-4 border-t border-gray-100">
          <a
            href="#enquire"
            className="inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-2.5 text-[14px] font-bold text-white shadow-sm transition-all hover:bg-maroon/90"
          >
            Enquiry Form
            <ArrowRight size={16} />
          </a>
          <a
            href="https://wa.me/919435049200?text=Hello%20ISG%2C%20I%27d%20like%20to%20enquire%20about%20admissions."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-maroon/30 bg-sand/60 px-6 py-2.5 text-[14px] font-bold text-maroon hover:bg-maroon hover:text-white transition-all"
          >
            <MessageCircle size={16} />
            WhatsApp Us
          </a>
        </div>
      ),
    },
    {
      num: "02",
      title: "Campus tour",
      bullets: [
        "Visit ISG on an ordinary school morning — not a staged open day.",
        "Meet the teacher who would take your child, and see a real lesson in progress.",
        "Bring your child along, and any questions you have about the Cambridge pathway.",
      ],
    },
    {
      num: "03",
      title: "Assessment",
      comment: "<!-- Assessment note: Gentle baseline check, not a high-stress exam -->",
      bullets: [
        "Schedule an age-appropriate assessment with our team, at a time that suits you.",
        "The assessment is a gentle baseline to understand where your child is and place them in the best-suited class.",
        "Submit the completed admission form on the day of assessment.",
      ],
    },
    {
      num: "04",
      title: "Interaction",
      bullets: [
        "A relaxed conversation with the parents and the child.",
        "It's a two-way meeting — a chance for us to know your child, and for you to ask us anything.",
        "For senior grades, a short discussion about subject choices and goals.",
      ],
    },
    {
      num: "05",
      title: "Offer & document submission",
      comment: "<!-- Document note: Originals to be presented for verification -->",
      bullets: [
        "On a successful assessment and interview, you'll receive a confirmation/offer from the school.",
        "Submit the required documents to complete enrolment.",
      ],
      documents: [
        "Child's birth certificate",
        "Child's Aadhaar card",
        "Passport-size photographs of the child",
        "Latest school report card and Transfer Certificate (TC) from previous school, if applicable",
        "Parents' ID and address proof",
        "Child's immunisation/medical record",
      ],
    },
    {
      num: "06",
      title: "Enrolment",
      bullets: [
        "Complete the enrolment by paying the applicable fees (fee structure shared during your admissions conversation).",
        "You'll be informed of your child's official start date.",
        "Welcome to ISG — we can't wait to meet your child.",
      ],
    },
  ];

  return (
    <section className="bg-sand py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-3">
            CLEAR & PERSONAL
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-[#1a1f2e] font-bold leading-tight mb-4">
            Admission Process
          </h2>
          <p className="font-sans text-[16px] leading-relaxed text-[#0f1423] font-medium">
            Joining ISG is simple and personal. Here's exactly what to expect, step by step.
          </p>
        </Reveal>

        {/* Vertical Stack of Expandable Step Cards */}
        <div className="space-y-5 mb-14">
          {stepsData.map((step, idx) => {
            const isOpen = !!openSteps[idx];
            return (
              <Reveal key={step.num} delay={idx * 60}>
                {step.comment && <span className="hidden" dangerouslySetInnerHTML={{ __html: step.comment }} />}
                
                <div 
                  className={cn(
                    "relative overflow-hidden rounded-2xl bg-white transition-all duration-300 border shadow-[0_4px_20px_rgba(0,0,0,0.03)]",
                    isOpen ? "border-maroon/40 shadow-[0_10px_30px_rgba(0,0,0,0.07)]" : "border-gray-200/80 hover:border-maroon/30"
                  )}
                >
                  {/* Right Edge Maroon Accent Bar */}
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-maroon rounded-r-2xl" />

                  {/* Header / Clickable Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleStep(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleStep(idx);
                      }
                    }}
                    aria-expanded={isOpen}
                    aria-controls={`step-content-${idx}`}
                    className="w-full text-left p-6 lg:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:bg-sand/30"
                  >
                    <div className="flex items-center gap-4 sm:gap-6 pr-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-maroon/10 text-maroon font-serif font-bold text-[17px]">
                        {step.num}
                      </span>
                      <h3 className="font-serif text-[clamp(1.2rem,2vw,1.5rem)] font-bold text-[#1a1f2e]">
                        {step.title}
                      </h3>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand text-maroon transition-transform duration-300">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {/* Expandable Detail Content */}
                  <div 
                    id={`step-content-${idx}`}
                    className={cn(
                      "px-6 lg:px-7 pl-[4.5rem] sm:pl-[5.25rem] border-t border-gray-100 transition-all duration-300 overflow-hidden",
                      isOpen ? "max-h-[800px] opacity-100 pb-7 lg:pb-8 pt-5 mt-4" : "max-h-0 opacity-0 pb-0 pt-0 mt-0 border-transparent"
                    )}
                  >
                    <ul className="space-y-3 mb-4">
                      {step.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-maroon shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="font-sans text-[15.5px] leading-relaxed text-[#0f1423] font-medium">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Required Documents Sub-list (for Step 5) */}
                    {step.documents && (
                      <div className="mt-5 p-5 rounded-xl bg-sand/60 border border-maroon/10">
                        <p className="font-serif text-[15.5px] font-bold text-[#1a1f2e] mb-3">
                          Documents typically required:
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-2.5">
                          {step.documents.map((doc, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2 text-[14.5px] text-gray-800 font-medium">
                              <span className="text-maroon font-bold">•</span>
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Custom Step Actions (Buttons for Step 1) */}
                    {step.actions && step.actions}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Key Admissions Information Note Box */}
        <Reveal delay={400}>
          <div className="rounded-2xl bg-white p-7 lg:p-9 border-l-4 border-maroon shadow-[0_4px_20px_rgba(0,0,0,0.04)] border-t border-r border-b border-gray-200/80 flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-maroon/10 text-maroon">
              <Info size={22} aria-hidden="true" />
            </div>
            <div>
              <h4 className="font-serif text-[18px] font-bold text-[#1a1f2e] mb-2">
                Key Admissions Information
              </h4>
              <p className="font-sans text-[15.5px] leading-relaxed text-[#0f1423] font-medium">
                Our academic year begins in April, and the admission process opens each October. Sibling discounts are available. Fee structure is shared on request during your admissions conversation.
              </p>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ==========================================================================
   Enquiry Form Section & CTA
   ========================================================================== */
function EnquirySection() {
  return (
    <section id="enquire" className="scroll-mt-24 bg-white py-20 lg:py-28 border-t border-gray-100">
      <div className="mx-auto max-w-[860px] px-6 lg:px-12">
        <Reveal className="text-center mb-12">
          <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-3">
            START ADMISSION ENQUIRY
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] leading-tight text-[#1a1f2e] font-bold mb-4">
            Start your child's admission
          </h2>
          <p className="font-sans text-[16px] leading-relaxed text-gray-700 font-normal max-w-xl mx-auto">
            Tell us about your child. Our admissions team will reach out to you the same day.
          </p>
        </Reveal>

        <Reveal delay={100} className="rounded-3xl bg-sand/50 p-8 sm:p-10 border border-gray-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
