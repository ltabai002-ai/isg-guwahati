import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { cn } from "@/lib/utils";

import heroImg from "@/assets/hero.jpg";
import dayArrival from "@/assets/day-arrival.jpg";
import dayLesson from "@/assets/day-lesson.jpg";
import dayLab from "@/assets/day-lab.jpg";
import dayPool from "@/assets/day-pool.jpg";
import dayTheatre from "@/assets/day-theatre.jpg";
import dayHome from "@/assets/day-home.jpg";
import chairmanImg from "@/assets/chairman.jpg";
import campusImg from "@/assets/campus.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "International School Guwahati — Education with pleasure, not pressure" },
      {
        name: "description",
        content:
          "North East India's first Cambridge school. Age 3 to A Level, max 20 per class, 63% A*–B at IGCSE and 90% of graduates studying abroad. Book a campus visit.",
      },
      {
        property: "og:title",
        content: "International School Guwahati — Education with pleasure, not pressure",
      },
      {
        property: "og:description",
        content:
          "Fifteen years of Cambridge education in Guwahati. Small classes, warm teaching, graduates across four continents.",
      },
    ],
  }),
  component: Home,
});

/* ---------------- data ---------------- */

const STAGES = [
  {
    id: "early",
    tab: "Early Years",
    age: "Ages 3–6",
    title: "The year your child learns that school is a happy place.",
    body: "Days are built around play, stories, songs and sand — because that is how three- and four-year-olds actually learn. Teachers notice the quiet child as readily as the loud one. Nothing is rushed, nothing is tested, and every child is walked in by name each morning.",
    size: "Maximum 20 children per section",
    leads: "Leads into Cambridge Primary, already confident with a pencil, a question and a friend.",
  },
  {
    id: "primary",
    tab: "Primary",
    age: "Ages 5–11",
    title: "Where curiosity turns into real, usable skill.",
    body: "Children study up to ten subjects — English, mathematics, science, digital literacy, the arts and more — taught as connected ideas rather than separate chores. Reading, writing and number sense are secured early, so later years never feel like catching up.",
    size: "Maximum 20 students per section",
    leads: "Leads into Lower Secondary with strong foundations and genuine independence.",
  },
  {
    id: "lower",
    tab: "Lower Secondary",
    age: "Ages 11–14",
    title: "The stretch years, held steadily.",
    body: "Subjects deepen, thinking gets sharper, and children begin to argue a point with evidence. This is also when adolescence arrives — so tutors stay close, and every child has an adult in school who knows how their week is going.",
    size: "Maximum 20 students per section",
    leads: "Leads into IGCSE with subject choices made calmly, not in a panic.",
  },
  {
    id: "igcse",
    tab: "Upper Secondary / IGCSE",
    age: "Ages 14–16",
    title: "Two years that open doors worldwide.",
    body: "Students work towards Cambridge IGCSE, chosen from a curriculum of 70+ subjects and recognised by universities and employers everywhere. Our results speak plainly: 63% A*–B. Preparation is thorough, but the pressure is ours to manage, not your child's to carry.",
    size: "Maximum 20 students per section",
    leads: "Leads into AS & A Level here, or to any Cambridge school in the world.",
  },
  {
    id: "advanced",
    tab: "Advanced / AS & A Level",
    age: "Ages 16–19",
    title: "Specialising, with a teacher who knows their name.",
    body: "Small cohorts of 12 to 15 mean seminar-style teaching, individual university guidance and time to go far beyond the syllabus. Students write, research and defend ideas the way undergraduates do — a year before they become one.",
    size: "12–15 students per class",
    leads: "Leads to university: 90% of our graduates go on to study abroad.",
  },
];

const DAY = [
  {
    time: "8:00 am",
    title: "Arrival & check-in",
    gives: "Every child is greeted by name — the day starts with being known.",
    img: dayArrival,
    alt: "A student arriving at the school gate and being welcomed by a smiling teacher in the morning light",
  },
  {
    time: "8:40 am",
    title: "Small-group lessons",
    gives: "With no more than 20 in a room, no question goes unasked.",
    img: dayLesson,
    alt: "A teacher sitting with a small group of students around a table in a bright classroom",
  },
  {
    time: "10:30 am",
    title: "Science lab",
    gives: "Ideas get tested with their own hands, not just read from a page.",
    img: dayLab,
    alt: "Students in lab coats and safety goggles running an experiment in the school science laboratory",
  },
  {
    time: "12:15 pm",
    title: "Break & swimming",
    gives: "Bodies move, friendships form, and afternoons stay focused.",
    img: dayPool,
    alt: "Children swimming in the school pool with a coach supervising at the poolside",
  },
  {
    time: "2:00 pm",
    title: "Theatre or art",
    gives: "A stage teaches a shy child that their voice carries.",
    img: dayTheatre,
    alt: "School children rehearsing a play on the school theatre stage under warm lights",
  },
  {
    time: "3:30 pm",
    title: "Home",
    gives: "Children leave tired in the good way — full, not drained.",
    img: dayHome,
    alt: "Students walking home from school with backpacks in the late afternoon sun",
  },
];

const VALUES = [
  {
    name: "Reflective",
    meaning: "A child who can look at their own work and say honestly what to do better.",
    how: "Teachers close each unit with reflection journals and one-to-one conversations rather than only a mark out of ten.",
  },
  {
    name: "Innovative",
    meaning: "A child who reaches for a new way when the first way doesn't work.",
    how: "Project work across subjects rewards original approaches, prototypes and productive mistakes.",
  },
  {
    name: "Confident",
    meaning: "A child who speaks up, and is comfortable being wrong out loud.",
    how: "Theatre, debate, presentations and small classes mean every student is heard every week.",
  },
  {
    name: "Engaged",
    meaning: "A child who wants to be in the room, not one waiting for the bell.",
    how: "Lessons begin with a question worth answering — the heart of pleasure, not pressure.",
  },
  {
    name: "Responsible",
    meaning: "A child who keeps their word to a friend, a team and a deadline.",
    how: "House duties, peer mentoring and community projects give responsibility that is real, not symbolic.",
  },
];

const DESTINATIONS = [
  { region: "Europe", pct: 80 },
  { region: "North America (USA)", pct: 10 },
  { region: "India", pct: 7 },
  { region: "Asia", pct: 3 },
];

const TESTIMONIALS = [
  {
    quote:
      "She comes home talking about what she learned, not what she was tested on. That was the whole reason we moved her here.",
    name: "Parent of a Grade 6 student",
  },
  {
    quote:
      "The teachers knew my son was struggling with mathematics before we did — and had a plan ready when they called.",
    name: "Parent of a Grade 10 student",
  },
  {
    quote:
      "A Level here felt like university already. Fifteen of us in a room, arguing about texts. I arrived abroad ready.",
    name: "Alumnus, now at university in the USA",
  },
  {
    quote:
      "Fifteen years in the same city, the same standards. You can see it in the children who leave.",
    name: "Parent of two ISG graduates",
  },
];

const STEPS = [
  { n: "01", t: "Enquiry", d: "Tell us about your child. We call back the same day." },
  { n: "02", t: "Campus tour", d: "Walk the school on a working day and meet teachers." },
  { n: "03", t: "Assessment", d: "A gentle, age-appropriate check of where your child is." },
  { n: "04", t: "Interview", d: "A conversation with the family — both ways." },
  { n: "05", t: "Enrolment", d: "Place confirmed, and a welcome pack before day one." },
];

/* ---------------- page ---------------- */

function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <StageSelector />
      <DayTimeline />
      <Stats />
      <ValuesExplorer />
      <Established />
      <Outcomes />
      <Testimonials />
      <Leadership />
      <Admissions />
      <Enquiry />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate">
      <img
        src={heroImg}
        alt="International School Guwahati students walking together across the campus lawn in late afternoon sunlight"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/92 via-navy-deep/75 to-navy-deep/35" />
      <div className="relative mx-auto max-w-[1240px] px-5 pt-24 pb-16 lg:px-8 lg:pt-36 lg:pb-24">
        <Reveal>
          <p className="text-[11px] tracking-[0.25em] text-white/60 uppercase">
            Cambridge International Education · Guwahati, Assam
          </p>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.4rem,6.4vw,5rem)] leading-[1.02] text-white">
            Education with pleasure, not pressure.
          </h1>
          <p className="mt-7 max-w-2xl text-[clamp(1.02rem,1.5vw,1.25rem)] leading-relaxed text-white/80">
            North East's first Cambridge school. Fifteen years, from age 3 to A Level — and
            graduates now studying across Europe, the USA and beyond.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contact"
              hash="enquire"
              className="rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-accent-foreground transition-transform duration-200 hover:scale-[1.03]"
            >
              Book a campus visit
            </Link>
            <Link
              to="/pathway"
              className="rounded-full border border-white/40 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              Explore the Cambridge pathway
            </Link>
          </div>
        </Reveal>
      </div>
      <div className="relative border-t border-white/15 bg-navy-deep/80 backdrop-blur">
        <dl className="mx-auto grid max-w-[1240px] grid-cols-2 divide-white/12 px-5 lg:grid-cols-4 lg:divide-x lg:px-8">
          {[
            ["Est.", "2010"],
            ["Stages", "KG – A Level"],
            ["Class size", "Max 20 per class"],
            ["Faculty", "45+ teachers"],
          ].map(([k, v]) => (
            <div key={k} className="px-1 py-5 lg:px-8">
              <dt className="text-[10.5px] tracking-[0.2em] text-white/45 uppercase">{k}</dt>
              <dd className="mt-1 font-serif text-[19px] text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Ticker() {
  const items = [
    "Cambridge Early Years to A Level",
    "Max 20 students per class",
    "90% of graduates to universities abroad",
    "First Cambridge school in the North East",
  ];
  const strip = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden bg-maroon py-4 text-white" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {strip.map((t, i) => (
              <span key={`${dup}-${i}`} className="flex items-center whitespace-nowrap">
                <span className="px-6 font-serif text-[17px] tracking-wide">{t}</span>
                <span className="text-white/50">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function StageSelector() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.25em] text-accent uppercase">Choose your child</p>
          <h2 className="mt-5 max-w-3xl font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] text-primary">
            Wherever your child is starting from, there's a place already waiting.
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <div role="tablist" aria-label="School stages" className="flex flex-wrap gap-2">
            {STAGES.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${s.id}`}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-[14px] transition-all duration-200",
                  i === active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground/75 hover:border-primary/40 hover:text-primary",
                )}
              >
                {s.tab}
                <span className="ml-2 text-[12px] opacity-70">{s.age.replace("Ages ", "")}</span>
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`panel-${stage.id}`}
            aria-labelledby={`tab-${stage.id}`}
            className="mt-8 grid gap-8 rounded-2xl border border-border bg-card p-7 lg:grid-cols-[1.35fr_0.65fr] lg:p-12"
          >
            <div>
              <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                {stage.age}
              </p>
              <h3 className="mt-4 font-serif text-[clamp(1.5rem,2.6vw,2.15rem)] leading-tight text-primary">
                {stage.title}
              </h3>
              <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-foreground/80">
                {stage.body}
              </p>
            </div>
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-sand p-6">
              <div>
                <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  Class size
                </p>
                <p className="mt-2 font-serif text-[19px] text-maroon">{stage.size}</p>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  Where it leads
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">{stage.leads}</p>
              </div>
              <Link
                to="/contact"
                hash="enquire"
                className="rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground transition-transform duration-200 hover:scale-[1.02]"
              >
                Ask about this stage
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DayTimeline() {
  return (
    <section className="bg-navy py-20 text-white lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.25em] text-white/55 uppercase">A day at ISG</p>
          <h2 className="mt-5 max-w-3xl font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.1]">
            This is what your child's Tuesday actually looks like.
          </h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/70">
            Labs, a pool, a library and a theatre only matter for what they give a child by four
            o'clock. Here is the day, hour by hour.
          </p>
        </Reveal>

        <ol className="mt-14 space-y-5">
          {DAY.map((row, i) => (
            <Reveal as="li" key={row.time} delay={i * 60}>
              <div className="group grid items-center gap-6 rounded-2xl border border-white/12 bg-white/[0.04] p-4 transition-colors duration-300 hover:bg-white/[0.08] md:grid-cols-[150px_220px_1fr]">
                <p className="px-3 font-serif text-[22px] text-gold md:px-4">{row.time}</p>
                <img
                  src={row.img}
                  alt={row.alt}
                  loading="lazy"
                  width={900}
                  height={700}
                  className="h-40 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.02] md:h-28"
                />
                <div className="px-1 pb-2 md:px-2 md:pb-0">
                  <h3 className="font-serif text-[22px] text-white">{row.title}</h3>
                  <p className="mt-1.5 text-[15.5px] leading-relaxed text-white/70">{row.gives}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { node: <CountUp to={15} suffix="+" />, label: "years of Cambridge teaching in Guwahati" },
    { node: <CountUp to={63} suffix="%" />, label: "A*–B at IGCSE" },
    { node: <CountUp to={90} suffix="%" />, label: "of graduates to universities abroad" },
    { node: <CountUp to={20} prefix="Max " />, label: "students per class" },
  ];
  return (
    <section className="bg-cream py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <h2 className="max-w-3xl font-serif text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.12] text-primary">
            Numbers we're happy for you to check.
          </h2>
        </Reveal>
        <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className="border-t-2 border-maroon pt-5">
                <dt className="font-serif text-[clamp(2.6rem,5vw,3.6rem)] leading-none text-maroon">
                  {s.node}
                </dt>
                <dd className="mt-3 max-w-[16rem] text-[15px] leading-relaxed text-foreground/75">
                  {s.label}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ValuesExplorer() {
  const [active, setActive] = useState(0);
  const v = VALUES[active];
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.25em] text-accent uppercase">What we grow</p>
          <h2 className="mt-5 max-w-3xl font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] text-primary">
            Five words we'd like your child to be described by at eighteen.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <ul className="space-y-2">
              {VALUES.map((item, i) => (
                <li key={item.name}>
                  <button
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    className={cn(
                      "flex w-full items-baseline gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-200",
                      i === active
                        ? "border-maroon bg-maroon text-white"
                        : "border-border bg-card hover:border-maroon/40",
                    )}
                  >
                    <span
                      className={cn(
                        "font-serif text-[13px]",
                        i === active ? "text-white/60" : "text-muted-foreground",
                      )}
                    >
                      0{i + 1}
                    </span>
                    <span className="font-serif text-[clamp(1.3rem,2.4vw,1.75rem)]">
                      {item.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-border bg-sand p-8 lg:p-12">
              <p className="font-serif text-[clamp(1.4rem,2.6vw,2rem)] leading-snug text-primary">
                {v.meaning}
              </p>
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  How we nurture it
                </p>
                <p className="mt-3 text-[16px] leading-relaxed text-foreground/80">{v.how}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Established() {
  return (
    <section className="bg-navy-deep py-20 text-white lg:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.25em] text-white/55 uppercase">
            Why families choose the established school
          </p>
          <h2 className="mt-5 font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.1]">
            Fifteen years of watching children grow into themselves.
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/75">
            New schools promise. We can show you. ISG was the first Cambridge school in the North
            East and remains its oldest — which means our teachers have taught the full pathway many
            times over, our results have a track record, and our alumni are already out in the
            world, writing to tell us how it went.
          </p>
          <ul className="mt-9 space-y-4 text-[15.5px] text-white/80">
            {[
              "The region's first and oldest Cambridge school — founded 2010 by NR Education Foundation.",
              "Senior faculty: 45+ teachers, 14% with a PhD and 58% with a Master's degree.",
              "Proven outcomes, published plainly: 63% A*–B at IGCSE.",
              "An alumni community spread across four continents — and still in touch.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <figure>
            <img
              src={campusImg}
              alt="Aerial view of the International School Guwahati campus with playing fields and classroom blocks"
              loading="lazy"
              width={1600}
              height={900}
              className="w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-4 text-[13.5px] text-white/55">
              Our campus at Sarusajai — science labs, library, swimming pool, sports room and
              theatre, on one site.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function Outcomes() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.25em] text-accent uppercase">Where they go next</p>
          <h2 className="mt-5 max-w-3xl font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] text-primary">
            Ninety per cent of our graduates go on to universities abroad.
          </h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-foreground/75">
            Not a marketing line — a map of where the last fifteen years have taken them.
          </p>
        </Reveal>

        <div className="mt-12 space-y-5">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.region} delay={i * 80}>
              <div className="grid items-center gap-3 sm:grid-cols-[220px_1fr_70px]">
                <p className="font-serif text-[19px] text-primary">{d.region}</p>
                <div className="h-3 overflow-hidden rounded-full bg-primary/10">
                  <div
                    className="h-full rounded-full bg-maroon transition-[width] duration-1000 ease-out"
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <p className="font-serif text-[19px] text-maroon sm:text-right">{d.pct}%</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-10 max-w-2xl text-[15px] text-muted-foreground">
            Destinations of ISG graduates: Europe, North America, India and Asia. Every A Level
            student receives individual university guidance from Grade 11.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <h2 className="max-w-3xl font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] text-primary">
            What families say when we're not in the room.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="h-full rounded-2xl border border-border bg-card p-8 transition-shadow duration-300 hover:shadow-[0_18px_50px_-32px_rgba(20,30,70,0.6)]">
                <span aria-hidden="true" className="font-serif text-4xl leading-none text-maroon">
                  "
                </span>
                <blockquote className="mt-3 font-serif text-[19px] leading-relaxed text-primary">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 text-[13px] tracking-[0.12em] text-muted-foreground uppercase">
                  {t.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <div className="grid gap-10 rounded-2xl bg-card p-7 lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
            <img
              src={chairmanImg}
              alt="The Chairman of International School Guwahati seated in his office"
              loading="lazy"
              width={912}
              height={1104}
              className="h-full max-h-[460px] w-full rounded-xl object-cover"
            />
            <div className="flex flex-col justify-center">
              <p className="text-[11px] tracking-[0.25em] text-accent uppercase">
                A message from our Chairman
              </p>
              <blockquote className="mt-6 font-serif text-[clamp(1.5rem,2.8vw,2.15rem)] leading-snug text-primary">
                "The aim of education should be to teach the child to think, not what to think."
              </blockquote>
              <p className="mt-6 text-[16.5px] leading-relaxed text-foreground/80">
                When we founded ISG in 2010, Guwahati had no Cambridge school. We began with a
                simple conviction: that children learn most deeply when they are enjoying
                themselves, and that a child under pressure learns only how to survive pressure.
                Fifteen years on, that conviction has been tested by every cohort — and by the young
                people who come back to visit us from universities around the world.
              </p>
              <p className="mt-5 text-[15px] text-muted-foreground">
                Chairman, NR Education Foundation
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Admissions() {
  return (
    <section className="bg-navy py-20 text-white lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.25em] text-white/55 uppercase">
            The admissions journey
          </p>
          <h2 className="mt-5 max-w-3xl font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.1]">
            Five unhurried steps, and someone with you at each one.
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-5 md:grid-cols-5">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80}>
              <div className="h-full border-t-2 border-gold/70 pt-5">
                <p className="font-serif text-[15px] text-gold">{s.n}</p>
                <h3 className="mt-2 font-serif text-[21px] text-white">{s.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-white/70">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200}>
          <div className="mt-14 grid gap-6 rounded-2xl border border-white/12 bg-white/[0.05] p-8 sm:grid-cols-3">
            {[
              ["Academic year", "Begins in April"],
              ["Admissions open", "From October"],
              ["Fees", "Shared on request · sibling discounts available"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[11px] tracking-[0.2em] text-white/45 uppercase">{k}</p>
                <p className="mt-2 font-serif text-[19px] text-white">{v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Enquiry() {
  return (
    <section id="enquire" className="scroll-mt-24 bg-background py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.25em] text-accent uppercase">Book a visit</p>
          <h2 className="mt-5 font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] text-primary">
            Tell us about your child. We'll call you back the same day.
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-foreground/75">
            The best way to know a school is to stand in it on an ordinary working morning. Come and
            see the classrooms full, the pool in use and the children mid-conversation — then decide.
          </p>
          <div className="mt-8 space-y-1 text-[15px] text-muted-foreground">
            <p>Nalapara, Kalimandir Path, Sarusajai</p>
            <p>P.O Saukuchi, Guwahati-781040, Assam</p>
            <p className="pt-3">Monday–Saturday, 8:30am – 4:00pm</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
