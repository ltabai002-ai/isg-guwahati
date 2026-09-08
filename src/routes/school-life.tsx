import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/PageIntro";
import { Reveal } from "@/components/site/Reveal";
import dayLab from "@/assets/day-lab.jpg";
import dayPool from "@/assets/day-pool.jpg";
import dayTheatre from "@/assets/day-theatre.jpg";
import dayLesson from "@/assets/day-lesson.jpg";

export const Route = createFileRoute("/school-life")({
  head: () => ({
    meta: [
      { title: "School Life at ISG — labs, pool, theatre and small classes" },
      {
        name: "description",
        content:
          "Science labs, a library, a swimming pool, a sports room and a theatre — and a community of 10+ nationalities at International School Guwahati.",
      },
      { property: "og:title", content: "School Life at International School Guwahati" },
      {
        property: "og:description",
        content: "What a child actually does here between eight in the morning and half past three.",
      },
    ],
  }),
  component: SchoolLife,
});

const FACILITIES = [
  {
    t: "Science laboratories",
    d: "Separate, fully equipped labs so experiments are run by students, not demonstrated to them.",
    img: dayLab,
    alt: "Students working with lab equipment in the school science laboratory",
  },
  {
    t: "Swimming pool",
    d: "Swimming is part of the timetable, not an add-on — every child learns to be safe in water.",
    img: dayPool,
    alt: "Children swimming with a coach at the school swimming pool",
  },
  {
    t: "Theatre",
    d: "A real stage where quiet children discover their voice carries further than they thought.",
    img: dayTheatre,
    alt: "Students rehearsing on the school theatre stage",
  },
  {
    t: "Library & sports room",
    d: "Quiet corners for reading and indoor space for movement, whatever the Assam weather is doing.",
    img: dayLesson,
    alt: "A small group of students reading and discussing with a teacher",
  },
];

function SchoolLife() {
  return (
    <>
      <PageIntro
        eyebrow="School life"
        title="Facilities only matter for what they give a child by four o'clock."
        lede="A campus of 10+ nationalities, classes capped at 20, and a day designed so that learning, movement and making all happen before your child comes home."
      />
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-5 md:grid-cols-2 lg:px-8">
          {FACILITIES.map((f, i) => (
            <Reveal key={f.t} delay={i * 80}>
              <article className="overflow-hidden rounded-2xl border border-border bg-card">
                <img
                  src={f.img}
                  alt={f.alt}
                  loading="lazy"
                  width={900}
                  height={700}
                  className="h-60 w-full object-cover"
                />
                <div className="p-7">
                  <h2 className="font-serif text-[22px] text-primary">{f.t}</h2>
                  <p className="mt-2 text-[16px] leading-relaxed text-foreground/80">{f.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-14 max-w-[1240px] px-5 lg:px-8">
          <Link
            to="/gallery"
            className="inline-block rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            See the photo gallery
          </Link>
        </div>
      </section>
    </>
  );
}
