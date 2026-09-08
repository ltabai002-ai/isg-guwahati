import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/PageIntro";
import { Reveal } from "@/components/site/Reveal";
import dayTheatre from "@/assets/day-theatre.jpg";
import dayLab from "@/assets/day-lab.jpg";
import dayPool from "@/assets/day-pool.jpg";
import campusImg from "@/assets/campus.jpg";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — International School Guwahati" },
      {
        name: "description",
        content:
          "Results, performances, sports and open mornings at International School Guwahati — what has been happening on campus this term.",
      },
      { property: "og:title", content: "News & Events at ISG" },
      {
        property: "og:description",
        content: "Term news, open mornings and student achievements from our Guwahati campus.",
      },
    ],
  }),
  component: News,
});

const POSTS = [
  {
    tag: "Results",
    date: "This term",
    t: "63% of our IGCSE cohort achieved A*–B",
    d: "Our teachers' verdict on the year: steady work, small classes and no last-minute panic.",
    img: dayLab,
    alt: "Students working in the science laboratory",
  },
  {
    tag: "Admissions",
    date: "From October",
    t: "Admissions open for the April academic year",
    d: "Open mornings run through October and November. Come and see an ordinary working day.",
    img: campusImg,
    alt: "Aerial view of the ISG campus",
  },
  {
    tag: "Arts",
    date: "Recent",
    t: "The whole of Grade 6 took to the stage",
    d: "Every child in the year group had a speaking part — that is the point of a school theatre.",
    img: dayTheatre,
    alt: "Students performing on the school theatre stage",
  },
  {
    tag: "Sport",
    date: "Recent",
    t: "Inter-house swimming gala at the school pool",
    d: "Four houses, one afternoon, and a great many very loud parents.",
    img: dayPool,
    alt: "Children swimming at the school pool",
  },
];

function News() {
  return (
    <>
      <PageIntro
        eyebrow="News & events"
        title="What's been happening on campus this term."
        lede="Results, performances, matches and open mornings — the ordinary and extraordinary days of a working school."
      />
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 md:grid-cols-2 lg:px-8">
          {POSTS.map((p, i) => (
            <Reveal as="article" key={p.t} delay={i * 80}>
              <div className="h-full overflow-hidden rounded-2xl border border-border bg-card">
                <img
                  src={p.img}
                  alt={p.alt}
                  loading="lazy"
                  width={900}
                  height={700}
                  className="h-56 w-full object-cover"
                />
                <div className="p-7">
                  <p className="text-[11px] tracking-[0.2em] text-accent uppercase">
                    {p.tag} · {p.date}
                  </p>
                  <h2 className="mt-3 font-serif text-[22px] leading-snug text-primary">{p.t}</h2>
                  <p className="mt-2 text-[16px] leading-relaxed text-foreground/80">{p.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
