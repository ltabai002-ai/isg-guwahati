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
          "Results, performances, sports, student achievements and open mornings at International School Guwahati — what has been happening on campus this term.",
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
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8 space-y-12">
          {/* Featured Student World Record Achievement */}
          <div id="world-record" className="scroll-mt-28">
            {/* confirm student's full name, class, exact record wording and date with client */}
            <span
              className="hidden"
              dangerouslySetInnerHTML={{ __html: "<!-- confirm student's full name, class, exact record wording and date with client -->" }}
            />
            <Reveal as="article">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-[#F8F6F2] p-7 lg:p-10 shadow-sm">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                  <div>
                    <span className="inline-block rounded-full bg-maroon/10 px-3.5 py-1 text-[11px] font-sans font-bold tracking-[0.2em] text-maroon uppercase">
                      Student Achievement · World Record Event
                    </span>
                    <h2 className="mt-4 font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.15] text-primary">
                      A world record, set by one of our own.
                    </h2>
                    <p className="mt-4 font-sans text-[16.5px] leading-relaxed text-slate-700">
                      ISG student Mrigank was among 396 participants who successfully set a Worldwide Book of Records world record for the most people solving a Pyraminx cube simultaneously — solving his in under 30 seconds.
                    </p>
                    <p className="mt-3 font-sans text-[15.5px] leading-relaxed text-slate-600">
                      In a remarkable showcase of focus and problem-solving speed, Mrigank completed his official cube solve during this historic group challenge. The entire ISG community congratulates Mrigank on this wonderful milestone!
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white">
                    {/* replace with REAL photo of student / event / certificate */}
                    <span
                      className="hidden"
                      dangerouslySetInnerHTML={{ __html: "<!-- replace with REAL photo of student / event / certificate -->" }}
                    />
                    <img
                      src="/images/mriganka.jpeg"
                      alt="ISG student Mrigank with his Pyraminx cube and Worldwide Book of Records official certificate"
                      loading="lazy"
                      width={900}
                      height={700}
                      className="h-full min-h-[260px] max-h-[360px] w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Grid of Other Posts */}
          <div className="grid gap-6 md:grid-cols-2">
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
        </div>
      </section>
    </>
  );
}
