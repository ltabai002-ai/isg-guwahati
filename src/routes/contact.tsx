import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/PageIntro";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Book a Visit — International School Guwahati" },
      {
        name: "description",
        content:
          "Visit International School Guwahati at Sarusajai, Guwahati-781040, Assam. Tell us about your child and we'll call you back the same day.",
      },
      { property: "og:title", content: "Contact International School Guwahati" },
      {
        property: "og:description",
        content: "Book a campus visit. We call every family back the same day.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Come and see an ordinary Tuesday."
        lede="The best way to know a school is to stand in it while it is working. Tell us about your child and we will call you back the same day."
      />
      <section id="enquire" className="scroll-mt-24 bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <Reveal>
            <h2 className="font-serif text-[26px] text-primary">Visit us</h2>
            <address className="mt-5 space-y-1 text-[16px] not-italic leading-relaxed text-foreground/80">
              <p>Nalapara, Kalimandir Path, Sarusajai</p>
              <p>P.O Saukuchi, Guwahati-781040, Assam</p>
              <p className="pt-4">
                <a className="hover:text-accent" href="tel:+919435049200">
                  +91 94350 49200
                </a>
              </p>
              <p>
                <a className="hover:text-accent" href="mailto:admissions@isguwahati.edu.in">
                  admissions@isguwahati.edu.in
                </a>
              </p>
              <p className="pt-4 text-muted-foreground">Monday–Saturday, 8:30am – 4:00pm</p>
            </address>
            <div className="mt-8 overflow-hidden rounded-xl border border-border">
              <iframe
                title="Map showing International School Guwahati, Sarusajai, Guwahati"
                src="https://www.google.com/maps?q=Sarusajai%2C%20Saukuchi%2C%20Guwahati%20781040%2C%20Assam&output=embed"
                width="100%"
                height="260"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
