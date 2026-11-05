import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { JoinFamilyCta } from "@/components/site/JoinFamilyCta";

// Assets

import dayLesson from "@/assets/day-lesson.jpg";
import dayArrival from "@/assets/day-arrival.jpg";
import dayLab from "@/assets/day-lab.jpg";
import dayPool from "@/assets/day-pool.jpg";
import dayTheatre from "@/assets/day-theatre.jpg";
import campusImg from "@/assets/campus.jpg";

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
    d: "Separate, fully equipped Physics, Chemistry, and Biology labs so experiments are run by students with their own hands, not demonstrated to them.",
    img: "/lab.webp",
    alt: "Students working with lab equipment in the school science laboratory",
  },
  {
    t: "Swimming pool & sports",
    d: "Half-Olympic size swimming pool with certified coaches. Swimming is part of the timetable — every child learns to be confident and safe in water.",
    img: "/SWIMMING PHOTO.webp",
    alt: "Children swimming with a coach at the school swimming pool",
  },
  {
    t: "Auditorium & Theatre",
    d: "A multi-purpose indoor theatre with a real stage and acoustics where quiet children discover their voice carries further than they thought.",
    img: dayTheatre,
    alt: "Students rehearsing on the school theatre stage",
  },
  {
    t: "Library & Sports Room",
    d: "Quiet reading bays with curated international literature, digital resources, and indoor sports spaces for active daily movement.",
    img: campusImg,
    alt: "A small group of students reading and discussing in the library",
  },
];

function SchoolLife() {
  return (
    <>
      <OverviewHero />
      <OverviewSection />
      <FacilitiesGrid />
      <JoinFamilyCta heading="Experience school life at ISG" />
    </>
  );
}

function OverviewHero() {
  return (
    <section className="relative bg-[#111625] pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/CISG.webp"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1329]/90 via-[#0b1329]/75 to-[#0b1329]/40" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-12">
        <Reveal>
          <h1 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] text-white font-bold leading-[1.15] max-w-4xl tracking-tight">
            Facilities only matter for what they give a child by four o'clock.
          </h1>
        </Reveal>
      </div>
    </section>
  );
}

function OverviewSection() {
  return (
    <section className="bg-sand pb-16 lg:pb-24">
      <div className="w-full">
        <div className="bg-white rounded-b-[40px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            
            <div className="px-6 py-12 lg:pl-[max(3rem,calc((100vw-1300px)/2))] lg:pr-16 lg:py-20 flex flex-col justify-center">
              <Reveal>
                <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-4">
                  SCHOOL LIFE AT ISG
                </p>
                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.2] text-[#1a1f2e] font-bold max-w-3xl">
                  A day designed so that learning, movement and making all happen naturally.
                </h2>
                <div className="mt-6 space-y-6 text-[15.5px] leading-relaxed text-gray-700 font-sans max-w-3xl">
                  <p>
                    We offer a <strong className="text-maroon font-bold">dynamic campus life</strong> with small classes capped at 20, bringing together a community of over 10 nationalities in a warm, encouraging environment.
                  </p>
                  <p>
                    From <strong className="text-maroon font-bold">science labs and swimming pools</strong> to public speaking on a real stage, our timetable ensures children leave tired in the good way — full of ideas, friendships, and new accomplishments.
                  </p>
                </div>

                {/* Accreditation Badge matching OurSchool in about.tsx */}
                <div className="mt-10 flex items-center justify-start">
                  <span className="hidden" dangerouslySetInnerHTML={{ __html: '<!-- Placeholder for accreditation logo -->' }} />
                  <div className="flex items-center gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-maroon bg-white text-maroon font-serif font-bold text-2xl shadow-sm">
                      CIE
                    </div>
                    <div className="flex flex-col border-l-2 border-gray-200 pl-5">
                      <span className="font-sans text-[16px] font-bold text-[#1a1f2e] leading-snug">
                        Cambridge International<br />Education
                      </span>
                      <span className="text-[13px] text-maroon font-semibold mt-1 uppercase tracking-wide">Accredited Campus</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="relative h-[350px] lg:h-full w-full">
              <Reveal delay={100} className="absolute inset-0 w-full h-full">
                <span className="hidden" dangerouslySetInnerHTML={{ __html: '<!-- Placeholder for real student photo -->' }} />
                <img 
                  src={dayLesson} 
                  alt="Students engaging in active campus learning at International School Guwahati" 
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

function FacilitiesGrid() {
  return (
    <section className="bg-sand py-20 lg:py-28 border-t border-border/40">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-[12px] tracking-[0.2em] text-maroon font-bold uppercase mb-4">
            ON-CAMPUS INFRASTRUCTURE
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-navy font-bold">
            Everything your child needs to explore and excel.
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {FACILITIES.map((f, i) => (
            <Reveal key={f.t} delay={i * 80}>
              <article className="group h-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <img
                    src={f.img}
                    alt={f.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-navy">{f.t}</h3>
                    <p className="mt-3 font-sans text-[15.5px] leading-relaxed text-gray-700">
                      {f.d}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/gallery"
            className="inline-block rounded-full bg-maroon px-8 py-3.5 font-sans text-[15px] font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:bg-maroon/90 hover:shadow-lg active:scale-[0.98]"
          >
            See full photo gallery &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
