import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/PageIntro";
import { Reveal } from "@/components/site/Reveal";
import campusImg from "@/assets/campus.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ISG — the North East's first Cambridge school" },
      {
        name: "description",
        content:
          "Founded in 2010 by NR Education Foundation, International School Guwahati is the region's first and oldest Cambridge school, with 45+ teachers and classes capped at 20.",
      },
      { property: "og:title", content: "About International School Guwahati" },
      {
        property: "og:description",
        content: "Fifteen years of Cambridge education in Guwahati — established, proven, warm.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageIntro
        eyebrow="About the school"
        title="Fifteen years of watching children grow into themselves."
        lede="International School Guwahati was founded in 2010 by NR Education Foundation as the first Cambridge school in North East India. It remains the region's oldest — and the motto we opened with has not changed: education with pleasure, not pressure."
      />
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-[clamp(1.7rem,3.2vw,2.4rem)] leading-tight text-primary">
              What has stayed the same since 2010.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-foreground/80">
              A Cambridge curriculum taught the way it was designed to be taught — through enquiry.
              Sections capped at 20 students up to IGCSE, and 12–15 at AS & A Level. Teachers who
              stay long enough to know a family, not just a child. And a campus at Sarusajai with
              science labs, a library, a swimming pool, a sports room and a theatre, all in daily
              use.
            </p>
            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                ["Founded", "2010, by NR Education Foundation"],
                ["Accreditation", "Cambridge International Education (CIE)"],
                ["Faculty", "45+ teachers · 14% PhD · 58% Master's"],
                ["Community", "10+ nationalities on campus"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-border pt-4">
                  <dt className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    {k}
                  </dt>
                  <dd className="mt-2 font-serif text-[18px] text-primary">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={100}>
            <img
              src={campusImg}
              alt="Aerial view of the International School Guwahati campus at Sarusajai"
              loading="lazy"
              width={1600}
              height={900}
              className="w-full rounded-2xl object-cover"
            />
            <div className="mt-6 rounded-2xl bg-sand p-8">
              <h3 className="font-serif text-[22px] text-primary">Our values</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-foreground/80">
                Reflective, Innovative, Confident, Engaged, Responsible — five words we would like
                every ISG student to be described by at eighteen.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
