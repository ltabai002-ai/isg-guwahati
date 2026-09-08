import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/PageIntro";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions at ISG — enquiry to enrolment in five steps" },
      {
        name: "description",
        content:
          "Admissions open in October for an April start at International School Guwahati. Enquiry, campus tour, assessment, interview, enrolment. Fees shared on request.",
      },
      { property: "og:title", content: "Admissions at International School Guwahati" },
      {
        property: "og:description",
        content: "Five unhurried steps from first enquiry to your child's first morning.",
      },
    ],
  }),
  component: Admissions,
});

const STEPS = [
  { n: "01", t: "Enquiry", d: "Send the form below or call us. We call back the same day." },
  { n: "02", t: "Campus tour", d: "Visit on a working day, meet teachers and see classes running." },
  { n: "03", t: "Assessment", d: "A gentle, age-appropriate check of where your child is today." },
  { n: "04", t: "Interview", d: "A conversation with the family — your questions matter as much." },
  { n: "05", t: "Enrolment", d: "Place confirmed and a welcome pack sent before day one." },
];

function Admissions() {
  return (
    <>
      <PageIntro
        eyebrow="Admissions"
        title="Five unhurried steps, and someone with you at each one."
        lede="The academic year begins in April and admissions open in October. Fees are shared on request, and sibling discounts are available."
      />
      <section className="bg-background py-20 lg:py-24">
        <ol className="mx-auto grid max-w-[1240px] gap-6 px-5 md:grid-cols-5 lg:px-8">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 70}>
              <div className="h-full border-t-2 border-maroon pt-5">
                <p className="font-serif text-[15px] text-maroon">{s.n}</p>
                <h2 className="mt-2 font-serif text-[21px] text-primary">{s.t}</h2>
                <p className="mt-2 text-[14.5px] leading-relaxed text-foreground/75">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>
      <section id="enquire" className="scroll-mt-24 bg-cream py-20 lg:py-24">
        <div className="mx-auto max-w-[820px] px-5 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight text-primary">
              Tell us about your child. We'll call you back the same day.
            </h2>
            <div className="mt-10">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
