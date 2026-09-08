import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/PageIntro";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/pathway")({
  head: () => ({
    meta: [
      { title: "The Cambridge Pathway at ISG — Early Years to A Level" },
      {
        name: "description",
        content:
          "Cambridge Early Years, Primary, Lower Secondary, IGCSE and AS & A Level at International School Guwahati — one continuous pathway from age 3 to 19.",
      },
      { property: "og:title", content: "The Cambridge Pathway at ISG" },
      {
        property: "og:description",
        content: "One continuous Cambridge pathway from age 3 to A Level, with small classes throughout.",
      },
    ],
  }),
  component: Pathway,
});

const STAGES = [
  {
    t: "Cambridge Early Years",
    a: "Ages 3–6",
    d: "Play-based learning: stories, songs, sand, water and the first happy habits of school. Nothing rushed, nothing tested.",
    s: "Max 20 per section",
  },
  {
    t: "Cambridge Primary",
    a: "Ages 5–11",
    d: "Foundational skills across up to 10 subjects, taught as connected ideas — reading, number sense and curiosity secured early.",
    s: "Max 20 per section",
  },
  {
    t: "Cambridge Lower Secondary",
    a: "Ages 11–14",
    d: "Deeper subject thinking and evidence-based argument, with tutors staying close through the adolescent years.",
    s: "Max 20 per section",
  },
  {
    t: "Cambridge Upper Secondary — IGCSE",
    a: "Ages 14–16",
    d: "IGCSE from a curriculum of 70+ subjects, recognised by universities worldwide. Our record: 63% A*–B.",
    s: "Max 20 per section",
  },
  {
    t: "Cambridge Advanced — AS & A Level",
    a: "Ages 16–19",
    d: "Pre-university specialisation in seminar-sized groups, with individual university guidance from Grade 11.",
    s: "12–15 per class",
  },
];

function Pathway() {
  return (
    <>
      <PageIntro
        eyebrow="The Cambridge Pathway"
        title="One pathway, age three to eighteen, without a single anxious handover."
        lede="Because we teach the full Cambridge programme on one campus, your child never has to start again somewhere new. Teachers hand a child on to a colleague who already knows them."
      />
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-[1240px] space-y-5 px-5 lg:px-8">
          {STAGES.map((s, i) => (
            <Reveal key={s.t} delay={i * 70}>
              <article className="grid gap-5 rounded-2xl border border-border bg-card p-8 md:grid-cols-[240px_1fr_200px]">
                <div>
                  <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    {s.a}
                  </p>
                  <h2 className="mt-2 font-serif text-[22px] text-primary">{s.t}</h2>
                </div>
                <p className="text-[16px] leading-relaxed text-foreground/80">{s.d}</p>
                <p className="font-serif text-[18px] text-maroon md:text-right">{s.s}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
