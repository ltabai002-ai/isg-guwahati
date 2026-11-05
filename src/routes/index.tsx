import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";
import { AlumniDestinations } from "@/components/site/AlumniDestinations";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { cn } from "@/lib/utils";
import { Building2, Compass, Users, Award, ArrowRight, RotateCcw, Lightbulb, MessageSquare, Globe, Handshake, Volume2, VolumeX, Play, Pause, ChevronDown, X, ChevronLeft, ChevronRight, Images } from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import newHeroBg from "@/assets/hero-bg-new.png";
import dayArrival from "@/assets/day-arrival.jpg";
import dayLesson from "@/assets/day-lesson.jpg";
import dayLab from "@/assets/day-lab.jpg";
import dayPool from "@/assets/day-pool.jpg";
import dayTheatre from "@/assets/day-theatre.jpg";
import dayHome from "@/assets/day-home.jpg";
import chairmanImg from "@/assets/chairman.jpg";
import newChairmanImg from "@/assets/Chairman.webp";
import newCeoImg from "@/assets/CEO.webp";
import samiranImg from "@/assets/samiranbordoloi.jpeg";
import campusImg from "@/assets/campus.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "International School Guwahati — Education through pleasure, not pressure" },
      {
        name: "description",
        content:
          "North East India's first Cambridge school. Age 3 to A Level, max 20 per class, 63% A*–B at IGCSE and 90% of passed-out students studying abroad. Book a campus visit.",
      },
      {
        property: "og:title",
        content: "International School Guwahati — Education through pleasure, not pressure",
      },
      {
        property: "og:description",
        content:
          "Sixteen years of Cambridge education in Guwahati. Small classes, warm teaching, passed-out students across four continents.",
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
    tabLabel: "Early Years",
    age: "Ages 3–7",
    title: "The years your child learns that school is a happy place.",
    body: "Days are built around play, stories, songs and sand — because that is how three- and four-year-olds actually learn. Teachers notice the quiet child as readily as the loud one. Nothing is rushed, nothing is tested, and every child is walked in by name each morning.",
    size: "Maximum 20 children per section",
    leads: "Leads into Cambridge Primary, already confident with a pencil, a question and a friend.",
    img: dayArrival,
    alt: "A student being welcomed at school gate in the morning",
  },
  {
    id: "primary",
    tab: "Primary",
    tabLabel: "Primary",
    age: "Ages 8–10",
    title: "Where curiosity turns into real, usable skill.",
    body: "Children study up to ten subjects — English, mathematics, science, digital literacy, the arts and more — taught as connected ideas rather than separate chores. Reading, writing and number sense are secured early, so later years never feel like catching up.",
    size: "Maximum 20 students per section",
    leads: "Leads into Lower Secondary with strong foundations and genuine independence.",
    img: dayLesson,
    alt: "Teacher working with a small group of primary students around a table",
  },
  {
    id: "lower",
    tab: "Lower Secondary",
    tabLabel: "Lower Secondary",
    age: "Ages 11–13",
    title: "The stretch years, held steadily.",
    body: "Subjects deepen, thinking gets sharper, and children begin to argue a point with evidence. This is also when adolescence arrives — so tutors stay close, and every child has an adult in school who knows how their week is going.",
    size: "Maximum 20 students per section",
    leads: "Leads into IGCSE with subject choices made calmly, not in a panic.",
    img: dayLab,
    alt: "Lower secondary students running an experiment in the science laboratory",
  },
  {
    id: "igcse",
    tab: "Upper Secondary / IGCSE",
    tabLabel: "Secondary",
    age: "Ages 14+",
    title: "Two years that open doors worldwide.",
    body: "Students work towards Cambridge IGCSE, chosen from a curriculum of 70+ subjects and recognised by universities and employers everywhere. Our results speak plainly: 63% A*–B. Preparation is thorough, but the pressure is ours to manage, not your child's to carry.",
    size: "Maximum 20 students per section",
    leads: "Leads into AS & A Level here, or to any Cambridge school in the world.",
    img: dayTheatre,
    alt: "Upper secondary students rehearsing on the school theatre stage",
  },
  {
    id: "advanced",
    tab: "Advanced / AS & A Level",
    tabLabel: "AS/A",
    age: "Ages 16+",
    title: "Specialising, with a teacher who knows their name.",
    body: "Small cohorts of 12 to 15 mean seminar-style teaching, individual university guidance and time to go far beyond the syllabus. Students write, research and defend ideas the way university scholars do — a year before entering university.",
    size: "12–15 students per class",
    leads: "Leads to university: 90% of our passed-out students go on to study abroad.",
    img: "/DSC_3762.jpg",
    alt: "Advanced level students with a teacher",
  },
];

const DAY = [
  {
    time: "8:00 am",
    title: "Arrival & check-in",
    gives: "Every child is greeted by name — the day starts with being known.",
    img: newHeroBg,
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
    img: "/lab.webp",
    alt: "Students in lab coats and safety goggles running an experiment in the school science laboratory",
  },
  {
    time: "12:15 pm",
    title: "Break & swimming",
    gives: "Bodies move, friendships form, and afternoons stay focussed.",
    img: "/SWIMMING PHOTO.webp",
    alt: "Children swimming in the school pool with a coach supervising at the poolside",
  },
  {
    time: "2:00 pm",
    title: "Sports or Art",
    gives: "A stage teaches a shy child that their skill matters.",
    img: dayTheatre,
    alt: "School children rehearsing a play on the school theatre stage under warm lights",
  },
  {
    time: "3:30 pm",
    title: "Home",
    gives: "Children leave tired in the good way — happy, not drained.",
    img: dayHome,
    alt: "Students walking home from school with backpacks in the late afternoon sun",
  },
];

/*
 * Cambridge Learner Attributes — these five match the official Cambridge framework.
 * CLIENT REVIEW: The descriptor text below is ISG's own wording. The official Cambridge definitions are:
 *   Reflective: "They understand themselves, always looking for ways they can become better learners."
 *   Innovative: "They are creative and ready for new and future challenges."
 *   Confident: "They are confident and capable in working with information and ideas — their own and those of others."
 *   Engaged: "They are intellectually and socially engaged, ready to make a difference in the world."
 *   Responsible: "They take responsibility for themselves, responsive to and respectful of others."
 * If the client wants official Cambridge wording instead of ISG's paraphrased versions, update accordingly.
 */
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
  { region: "Europe", pct: "80%" },
  { region: "North America", pct: "10%" },
  { region: "India", pct: "7%" },
  { region: "Asia", pct: "3%" },
];

const ACHIEVEMENT_IMAGES = [
  {
    img: "/images/mriganka.jpeg",
    alt: "ISG student Mrigank holding his Pyraminx cube and official Worldwide Book of Records certificate",
    label: "World Record Certificate",
    tag: "WORLD RECORD",
    category: "WORLD RECORD",
    title: "Mrigank's World Record",
    description: "ISG student Mrigank Choudhury holds an official Worldwide Book of Records certificate for speed solving the Pyraminx cube.",
  },
  {
    img: samiranImg,
    alt: "ISG students participating and achieving success in the Samiran Bordoloi Tournament",
    label: "Samiran Bordoloi Trophy",
    tag: "TOURNAMENT WINNERS",
    category: "TOURNAMENT VICTORY",
    title: "Samiran Bordoloi Tournament",
    description: "ISG students demonstrating teamwork, sportsmanship, and excellence in the prestigious Samiran Bordoloi Tournament.",
  },
  {
    img: dayTheatre,
    alt: "ISG students participating in mass events and competitions",
    label: "396-Participant Event",
    tag: "396 PARTICIPANTS",
    category: "MASS EVENT",
    title: "Mass Competition Event",
    description: "ISG students taking part alongside 396 participants in a mass simultaneous Pyraminx solving challenge.",
  },
  {
    img: campusImg,
    alt: "International School Guwahati Sarusajai campus student achievements",
    label: "ISG Campus Excellence",
    tag: "ISG MILESTONE",
    category: "CAMPUS MILESTONE",
    title: "Sarusajai Campus Milestones",
    description: "Fostering an environment where every student is encouraged to excel in academics, sports, and co-curricular activities.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "ISG prepared my daughter so thoroughly for international academics. The guidance she received gave her the confidence to thrive at UC Davis.",
    name: "Rajen Singh",
    role: "Parent (child now at UC Davis, USA)",
    initials: "RS",
  },
  {
    quote:
      "The blend of academic rigour and character building at ISG is exceptional. My children are encouraged to think critically while staying grounded.",
    name: "Dr. Ashish Malakar",
    role: "Parent / Founder, Apollo (Guwahati)",
    initials: "AM",
  },
  {
    quote:
      "The depth of teaching and genuine inquiry at ISG is remarkable. Students are taught how to think, evaluate, and express themselves independently.",
    name: "Prof. Bibhash Choudhury",
    role: "Gauhati University",
    initials: "BC",
  },
  {
    quote:
      "ISG always felt like family. The personal mentorship from my teachers shaped my career and instilled a lifelong love of learning.",
    name: "Jerif Zayeed",
    role: "Alumnus",
    initials: "JZ",
  },
];

const STEPS = [
  { n: "01", t: "Enquiry", d: "Tell us about your child. We call back the same day." },
  { n: "02", t: "Campus tour", d: "Walk the school on a working day and meet teachers." },
  { n: "03", t: "Assessment", d: "A gentle, age-appropriate check of where your child is." },
  { n: "04", t: "Interaction", d: "A conversation with the family — both ways." },
  { n: "05", t: "Enrolment", d: "Place confirmed, and a welcome pack before day one." },
];

/* ---------------- page ---------------- */

import { JoinFamilyCta } from "@/components/site/JoinFamilyCta";

function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <AboutISG />
      <ExpandingVideoSection />
      <AlumniDestinations 
        eyebrow="OUR ALUMNI"
        headline="Where sixteen years have taken them."
        lead="Every journey becomes a classroom, and every new place becomes a lesson."
        limit={9}
        linkToAcademics={true}
      />
      <InternationalTrips />
      <StageSelector />
      <DayTimeline />
      <Stats />
      <FacilitiesSection />
      <BoardingInfoBand />
      <ApproachTagline />
      <Outcomes />
      <StudentAchievement />
      <Testimonials />
      <VideoExperiences />
      <Leadership />
      <Admissions />
      <JoinFamilyCta heading="Ready to join the ISG family?" />
      <Enquiry />
    </>
  );
}

function InternationalTrips() {
  const [activeGallery, setActiveGallery] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const TRIPS = [
    { id: "nasa", title: "NASA Space Camp", location: "USA", img: "/images/US Nasa tour/NASA_Enhanced.jpg", isAlbum: true },
    { id: "zambia", title: "Zambia Exchange Program", location: "Zambia", img: "/images/Zambia/zambiatour.webp", isAlbum: true },
    { id: "egypt", title: "Egypt Tour", location: "Egypt", img: "/IMG_1504.JPG", isAlbum: false }
  ];

  const GALLERIES: Record<string, { title: string, photos: string[] }> = {
    nasa: {
      title: "NASA TOUR",
      photos: [
        "/images/US Nasa tour/NASA_Enhanced.jpg",
        "/images/US Nasa tour/DSCN1933_Enhanced.JPG",
        "/images/US Nasa tour/DSCN1206_Enhanced.JPG",
        "/images/US Nasa tour/IMG_1597_Enhanced.JPG",
        "/images/US Nasa tour/DSCN1193_Enhanced.JPG",
        "/images/US Nasa tour/1000287076.jpg",
        "/images/US Nasa tour/1000287078.jpg",
        "/images/US Nasa tour/DSC00096.JPG",
        "/images/US Nasa tour/DSC00209.JPG",
        "/images/US Nasa tour/DSCN1204.JPG",
        "/images/US Nasa tour/NASA 5 copy.jpg"
      ]
    },
    zambia: {
      title: "ZAMBIA TOUR",
      photos: [
        "/images/Zambia/zambiatour.webp",
        "/images/Zambia/zambiatour 1.webp",
        "/images/Zambia/zambiatour 2.webp",
        "/images/Zambia/zambiatour 3.webp",
        "/images/Zambia/zambiatour 4.webp",
        "/images/Zambia/IMG_5508.JPG"
      ]
    }
  };

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!activeGallery) return;
    const photos = GALLERIES[activeGallery].photos;
    setPhotoIndex(prev => (prev < photos.length - 1 ? prev + 1 : 0));
  }, [activeGallery]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!activeGallery) return;
    const photos = GALLERIES[activeGallery].photos;
    setPhotoIndex(prev => (prev > 0 ? prev - 1 : photos.length - 1));
  }, [activeGallery]);

  useEffect(() => {
    if (!activeGallery) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setActiveGallery(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeGallery, handlePrev, handleNext]);

  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal>
            <p className="text-[12px] tracking-[0.2em] text-maroon font-bold uppercase mb-4">
              INTERNATIONAL TRIPS
            </p>
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-[#1a1f2e] font-bold">
              Learning beyond the classroom, <br className="hidden sm:block"/>
              <span className="text-maroon">beyond the borders.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {TRIPS.map((trip, i) => (
            <Reveal key={trip.title} delay={(i % 3) * 80}>
              <button 
                type="button"
                aria-label={trip.isAlbum ? "Open photo album" : undefined}
                className={cn(
                  "group relative block h-[350px] w-full overflow-hidden rounded-2xl shadow-lg border border-border/40 text-left focus:outline-none focus:ring-4 focus:ring-maroon",
                  trip.isAlbum ? "cursor-pointer" : "cursor-default"
                )}
                onClick={() => {
                  if (trip.isAlbum && trip.id) {
                    setPhotoIndex(0);
                    setActiveGallery(trip.id);
                  }
                }}
              >
                {/* Visible thumbnail image */}
                <img
                  src={trip.img}
                  alt={trip.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07132B]/95 via-[#07132B]/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="inline-block rounded-full bg-maroon/90 px-3.5 py-1 font-sans text-[10.5px] font-bold tracking-widest text-white uppercase shadow-xs">
                      {trip.location}
                    </span>
                    {trip.isAlbum && trip.id && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/90 px-3 py-1 font-sans text-[11px] font-extrabold tracking-wider text-navy uppercase shadow-xs">
                        <Images className="h-3.5 w-3.5" />
                        <span>{GALLERIES[trip.id].photos.length} PHOTOS</span>
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-white font-bold leading-snug">
                      {trip.title}
                    </h3>
                  </div>
                </div>

                {/* Hidden images for static Vanilla JS modal support */}
                {trip.isAlbum && trip.id && GALLERIES[trip.id]?.photos.map((photoUrl, pIdx) => (
                  <img 
                    key={pIdx} 
                    src={photoUrl} 
                    alt={`${trip.title} Photo ${pIdx + 1}`} 
                    data-title={GALLERIES[trip.id!].title}
                    className="album-photo hidden" 
                  />
                ))}
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {activeGallery && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex flex-col items-center justify-between bg-[#07132B]/95 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setActiveGallery(null)}
        >
          <div className="w-full max-w-5xl flex items-center justify-between z-10 pt-2 pb-3">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-maroon px-3 py-1 font-sans text-[11px] font-bold tracking-widest text-white uppercase shadow-xs">
                {GALLERIES[activeGallery].title}
              </span>
              <span className="font-sans text-[13px] font-semibold text-white/80">
                Photo {photoIndex + 1} of {GALLERIES[activeGallery].photos.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActiveGallery(null)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/15 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div
            className="relative my-auto flex items-center justify-center max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:-left-12 z-20 grid h-12 w-12 place-items-center rounded-full bg-black/50 border border-white/30 text-white shadow-xl transition-all hover:bg-maroon hover:scale-110 cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex flex-col items-center max-w-full">
              <img
                src={GALLERIES[activeGallery].photos[photoIndex]}
                alt={GALLERIES[activeGallery].title}
                className="max-h-[68vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:-right-12 z-20 grid h-12 w-12 place-items-center rounded-full bg-black/50 border border-white/30 text-white shadow-xl transition-all hover:bg-maroon hover:scale-110 cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div
            className="w-full max-w-3xl flex items-center justify-start gap-3 overflow-x-auto py-3 px-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs z-10 scrollbar-none"
            onClick={(e) => e.stopPropagation()}
          >
            {GALLERIES[activeGallery].photos.map((pt, idx) => (
              <button
                key={pt}
                type="button"
                onClick={() => setPhotoIndex(idx)}
                className={cn(
                  "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all cursor-pointer",
                  idx === photoIndex
                    ? "border-maroon scale-105 shadow-md ring-2 ring-maroon/50"
                    : "border-white/20 opacity-60 hover:opacity-100"
                )}
              >
                <img src={pt} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function Hero() {
  return (
    <section className="relative bg-navy-deep">
      {/* replace with REAL ISG campus/student photo — stock placeholder harms trust */}
      <span
        className="hidden"
        dangerouslySetInnerHTML={{ __html: "<!-- replace with REAL ISG campus/student photo — stock placeholder harms trust -->" }}
      />
      {/* Full-Bleed Campus Background Photo with Left Gradient Overlay */}
      <div className="relative min-h-[75vh] lg:min-h-[82vh] flex flex-col justify-center overflow-hidden">
        {/* Desktop Image */}
        <img
          src={newHeroBg}
          alt="International School Guwahati students walking together across the Sarusajai campus lawn in late afternoon sunlight"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover hidden md:block"
        />
        {/* Mobile Image */}
        <img
          src="/images/homehero45.webp"
          alt="International School Guwahati students walking together across the Sarusajai campus lawn in late afternoon sunlight"
          width={800}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover md:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07132B]/95 via-[#07132B]/85 to-[#07132B]/35" />
        
        {/* Left-Aligned Content Container */}
        <div className="relative z-10 mx-auto max-w-[1240px] w-full px-5 pt-28 pb-28 lg:px-8 lg:pt-36 lg:pb-36">
          <Reveal>
            <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-white/70 uppercase">
              Cambridge International Education · Guwahati, Assam
            </p>
            <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.5rem,5.8vw,5.2rem)] font-extrabold leading-[1.08] text-white tracking-tight">
              Education through pleasure, not pressure.
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-[clamp(1.05rem,1.4vw,1.2rem)] leading-relaxed text-white/85">
              North East's first Cambridge school. Internationally recognized education, from Nursery to A Level — and
              ISG school graduates are now studying in some of the best colleges and universities across India, Europe, The USA and beyond.
            </p>
            <div className="mt-9 flex flex-wrap gap-4 items-center">
              <Link
                to="/"
                hash="enquire"
                className="inline-flex items-center gap-2.5 rounded-full bg-maroon px-8 py-4 font-sans text-[15px] font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-maroon/90 hover:shadow-xl active:scale-[0.98]"
              >
                <span>Book a campus visit</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/pathway"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/60 bg-white/5 backdrop-blur-xs px-8 py-4 font-sans text-[15px] font-semibold text-white transition-all duration-300 hover:bg-white/15 hover:border-white/80"
              >
                <span>Explore the Cambridge pathway</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Floating White Features Card (Sitting half over hero photo and half over section below) */}
      <div className="relative z-20 mx-auto max-w-[1240px] px-5 lg:px-8 -mt-14 sm:-mt-16 lg:-mt-16">
        <div className="rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-7 lg:p-8 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
            {/* Feature 1 */}
            <div className="flex items-start gap-4 lg:pr-6 lg:border-r border-gray-100">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maroon/10 text-maroon">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-[18px] lg:text-[20px] font-bold text-primary leading-tight">
                  Est. 2010
                </h3>
                <p className="mt-1 font-sans text-[13px] font-medium text-slate-600 leading-snug">
                  First Cambridge school in the North East
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4 lg:px-6 lg:border-r border-gray-100">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maroon/10 text-maroon">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-[18px] lg:text-[20px] font-bold text-primary leading-tight">
                  Nur - A Level (18+ Years)
                </h3>
                <p className="mt-1 font-sans text-[13px] font-medium text-slate-600 leading-snug">
                  16 continuous years of Cambridge pathway
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4 lg:px-6 lg:border-r border-gray-100">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maroon/10 text-maroon">
                <Users className="h-6 w-6" />
              </div>
              <div>
                {/* CLIENT CHECK: document says ratio 1:12 (higher classes) to 1:20 (lower classes) — confirm which figures are current before launch */}
                <h3 className="font-serif text-[18px] lg:text-[20px] font-bold text-primary leading-tight">
                  Max 20 per class
                </h3>
                <p className="mt-1 font-sans text-[13px] font-medium text-slate-600 leading-snug">
                  Small sections so every name is known
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4 lg:pl-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maroon/10 text-maroon">
                <Award className="h-6 w-6" />
              </div>
              <div>
                {/* CLIENT CHECK: document says 40+ faculty / ratio 1:12–1:20 / 20+ trips — confirm which figures are current before launch */}
                <h3 className="font-serif text-[18px] lg:text-[20px] font-bold text-primary leading-tight">
                  45+ Faculty
                </h3>
                <p className="mt-1 font-sans text-[13px] font-medium text-slate-600 leading-snug">
                  Senior educators · 14% holding PhDs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  /* CLIENT CHECK: document says ratio 1:12–1:20 — confirm "Max 20" is still the preferred wording before launch */
  const items = [
    "Cambridge Early Years to A Level",
    "Max 20 students per class",
    "90% of alumni to top universities in India + Abroad",
    "First Cambridge school in the North East",
  ];
  const strip = [...items, ...items, ...items];
  return (
    <div className="pt-6 sm:pt-8 lg:pt-10 bg-[#07132B] overflow-hidden">
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
    </div>
  );
}

function AboutISG() {
  return (
    <section className="bg-[#F8F6F2] py-16 lg:py-24 overflow-hidden border-b border-gray-200/70">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 items-center">
          
          {/* Left Column: Real Campus Photo (Matching Reference Layout) */}
          <Reveal>
            <figure className="group relative">
              {/* replace with REAL ISG campus photo */}
              <span
                className="hidden"
                dangerouslySetInnerHTML={{ __html: "<!-- replace with REAL ISG campus photo -->" }}
              />
              <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-200 bg-white">
                <img
                  src="/aboutusphoto.webp"
                  alt="Aerial view of the International School Guwahati campus with playing fields and classroom blocks"
                  loading="lazy"
                  width={1600}
                  height={900}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-4 font-sans text-[13.5px] leading-relaxed text-slate-500">
                Our campus at Sarusajai — science labs, library, swimming pool, sports room and theatre, on one site.
              </figcaption>
            </figure>
          </Reveal>

          {/* Right Column: Welcome Text, Stat Row & Action */}
          <Reveal delay={100}>
            <div className="flex flex-col items-start">
              <p className="text-[11px] tracking-[0.25em] text-maroon font-sans font-bold uppercase">
                THE NORTH EAST'S FIRST CAMBRIDGE SCHOOL
              </p>
              <h2 className="mt-3 max-w-2xl font-serif text-[clamp(2.1rem,4.2vw,3.2rem)] font-bold leading-[1.12] text-primary">
                Sixteen years of proof that happy children go far.
              </h2>
              
              <p className="mt-5 font-sans text-[16px] leading-relaxed text-slate-700">
                International School Guwahati is the region's first and oldest Cambridge school, founded in 2010. New schools promise; we can show you — sixteen years of taking children from age three to a university offer abroad, in classes small enough to know every name. Education through pleasure, not pressure.
              </p>

              {/* Clean Horizontal Stat Row matching reference design */}
              {/* CLIENT CHECK: document says 40+ faculty / ratio 1:12–1:20 / 20+ trips — confirm which figures are current before launch */}
              <div className="mt-7 w-full py-5 border-y border-gray-300/70 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="sm:border-r border-gray-200/90 sm:pr-4">
                  <p className="font-serif text-[22px] lg:text-[24px] font-extrabold text-primary">Est. 2010</p>
                  <p className="mt-0.5 font-sans text-[12.5px] font-medium text-slate-600 leading-snug">first in the North East</p>
                </div>
                <div className="sm:border-r border-gray-200/90 sm:px-4">
                  <p className="font-serif text-[22px] lg:text-[24px] font-extrabold text-primary">63%</p>
                  <p className="mt-0.5 font-sans text-[12.5px] font-medium text-slate-600 leading-snug">A*–A at IGCSE</p>
                </div>
                <div className="sm:border-r border-gray-200/90 sm:px-4">
                  {/* CLIENT CHECK: document says 40+ trained faculty — confirm 45+ is current */}
                  <p className="font-serif text-[22px] lg:text-[24px] font-extrabold text-primary">45+ teachers</p>
                  <p className="mt-0.5 font-sans text-[12.5px] font-medium text-slate-600 leading-snug">14% PhD</p>
                </div>
                <div className="sm:pl-4">
                  <p className="font-serif text-[22px] lg:text-[24px] font-extrabold text-primary">Alumni</p>
                  <p className="mt-0.5 font-sans text-[12.5px] font-medium text-slate-600 leading-snug">on 4 continents</p>
                </div>
              </div>

              <Link
                to="/about"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-maroon px-8 py-3.5 font-sans text-[15px] font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:bg-maroon/90 hover:shadow-lg active:scale-[0.98]"
              >
                <span>Discover more</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

function StageSelector() {
  const [activeTab, setActiveTab] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveTab((index + 1) % STAGES.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveTab((index - 1 + STAGES.length) % STAGES.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveTab(STAGES.length - 1);
    }
  };

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden border-b border-gray-100">
      <div className="mx-auto max-w-[1300px] px-5 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-[11px] tracking-[0.25em] text-maroon font-sans font-bold uppercase mb-3">
            CHOOSE YOUR CHILD'S ENTRY
          </p>
          <h2 className="font-serif text-[clamp(2.1rem,4.2vw,3.2rem)] leading-[1.12] text-primary font-bold">
            Wherever your child is starting from, there's a future waiting to be created....
          </h2>
        </Reveal>

        {/* Tab Navigation Bar */}
        <Reveal delay={80} className="mb-14">
          <div
            role="tablist"
            aria-label="School stages"
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-5xl mx-auto px-2"
          >
            {STAGES.map((s, i) => {
              const isActive = i === activeTab;
              return (
                <button
                  key={s.id}
                  id={`tab-${s.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${s.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={cn(
                    "px-5 py-3 sm:px-6 sm:py-3.5 text-[13.5px] sm:text-[14.5px] font-sans font-bold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2 cursor-pointer",
                    isActive
                      ? "bg-maroon text-white shadow-md scale-105"
                      : "bg-[#F8F6F2] text-gray-700 border border-gray-200 hover:bg-gray-100 hover:border-maroon/40"
                  )}
                >
                  {s.tabLabel}
                  <span className="ml-1.5 text-[12px] opacity-80">
                    ({s.age.replace("Ages ", "")})
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Tab Panel Display - Render ALL 5 panels so they exist in HTML */}
        {STAGES.map((st, i) => {
          const isActive = i === activeTab;
          return (
            <div
              key={st.id}
              id={`panel-${st.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${st.id}`}
              className={cn(
                "stage-panel transition-all duration-300 ease-in-out",
                !isActive && "hidden"
              )}
            >
              <div className="grid gap-12 lg:grid-cols-[380px_1fr] items-center bg-[#F8F6F2] rounded-2xl p-5 sm:p-8 lg:p-12 border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                
                {/* LEFT Column: Cut-out Student Photo on Soft Circular Maroon Background */}
                <div className="flex w-full justify-center items-center">
                  <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl bg-gradient-to-tr from-maroon/20 via-maroon/10 to-[#F8F6F2] border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                    {/* replace with REAL ISG campus/student photo — stock placeholder harms trust */}
                    <span
                      className="hidden"
                      dangerouslySetInnerHTML={{ __html: "<!-- replace with REAL ISG campus/student photo — stock placeholder harms trust -->" }}
                    />
                    <img
                      src={st.img}
                      alt={`${st.title} students on Sarusajai campus`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* RIGHT Column: Title, Age Pill, Body, Size & Leads Info Cards, CTA */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="font-serif text-[clamp(1.7rem,2.8vw,2.3rem)] font-bold text-[#1a1f2e]">
                      {st.title}
                    </h3>
                    <span className="inline-block rounded-full bg-maroon px-4 py-1 text-[12.5px] font-sans font-bold text-white uppercase tracking-wider">
                      {st.age}
                    </span>
                  </div>

                  <p className="font-sans text-[16px] lg:text-[17px] leading-relaxed text-[#0f1423] font-normal mb-8 max-w-3xl">
                    {st.body}
                  </p>

                  {/* Class Size and Next Stage Feature Cards */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start gap-3.5 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm transition-all duration-300 hover:shadow-md">
                      <Users size={20} className="text-maroon shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-maroon mb-0.5">
                          Class Size
                        </p>
                        <p className="font-sans text-[14.5px] font-semibold text-[#0f1423] leading-snug">
                          {st.size}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm transition-all duration-300 hover:shadow-md">
                      <ArrowRight size={20} className="text-maroon shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-maroon mb-0.5">
                          Pathway Progression
                        </p>
                        <p className="font-sans text-[14.5px] font-semibold text-[#0f1423] leading-snug">
                          {st.leads}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Row */}
                  <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-gray-200/80">
                    <Link
                      to="/admissions"
                      hash="enquire"
                      className="inline-flex items-center gap-2.5 rounded-full bg-maroon px-7 py-3.5 font-sans text-[14.5px] font-bold text-white shadow-md transition-all duration-300 hover:bg-maroon/90 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Book a Campus Visit
                      <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                    <Link
                      to="/academics"
                      className="inline-flex items-center gap-2 font-sans text-[14.5px] font-bold text-maroon hover:underline"
                    >
                      View Full Curriculum
                    </Link>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DayTimeline() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const dayMoments = [
    {
      number: "01",
      time: "8:00 AM",
      title: "Arrival & check-in",
      collapsedDesc: "Every child is greeted by name — the day starts with being known.",
      expandedText: "A teacher is at the gate every morning; no child slips in unseen.",
      img: newHeroBg,
      alt: "A student arriving at the school gate and being welcomed by a smiling teacher in the morning light",
    },
    {
      number: "02",
      time: "8:40 AM",
      title: "Small-group lessons",
      collapsedDesc: "With no more than 20 in a room, no question goes unasked.",
      expandedText: "Class sizes are capped at 20 so every child is drawn into the lesson, not lost in it.",
      img: dayLesson,
      alt: "A teacher sitting with a small group of students around a table in a bright classroom",
    },
    {
      number: "03",
      time: "10:30 AM",
      title: "Science lab",
      collapsedDesc: "Ideas get tested with their own hands, not just read from a page.",
      expandedText: "Dedicated Physics, Chemistry and Biology labs mean real experiments, not demonstrations.",
      img: "/lab.webp",
      alt: "Students in lab coats and safety goggles running an experiment in the school science laboratory",
    },
    {
      number: "04",
      time: "12:15 PM",
      title: "Break & swimming",
      collapsedDesc: "Bodies move, friendships form, and afternoons stay focussed.",
      expandedText: "An on-campus pool and open grounds mean movement is part of every day, not a weekly treat.",
      img: "/SWIMMING PHOTO.webp",
      alt: "Children swimming in the school pool with a coach supervising at the poolside",
    },
    {
      number: "05",
      time: "2:00 PM",
      title: "Sports or Art",
      collapsedDesc: "A stage teaches a shy child that their skill matters.",
      expandedText: "A sports arena and art studio give every child a place to be heard, not just the confident ones.",
      img: dayTheatre,
      alt: "School children rehearsing a play on the school theatre stage under warm lights",
    },
    {
      number: "06",
      time: "3:30 PM",
      title: "Home",
      collapsedDesc: "Children leave tired in the good way — happy, not drained.",
      expandedText: "The day is paced so children go home curious and content, not burnt out.",
      img: dayHome,
      alt: "Students walking home from school with backpacks in the late afternoon sun",
    },
  ];

  const toggleCard = (idx: number) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="bg-[#07132B] py-20 lg:py-28 text-white border-b border-white/10 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        
        {/* Section Header with Intro Text */}
        <Reveal>
          <div className="pb-12 lg:pb-16 border-b border-white/10">
            <div className="max-w-3xl">
              <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-gold uppercase">
                A DAY AT ISG
              </p>
              <h2 className="mt-4 font-serif text-[clamp(2.1rem,4.2vw,3.2rem)] font-bold leading-[1.12] text-white">
                This is what a typical day for your child actually looks like.
              </h2>
            </div>
          </div>
        </Reveal>

        {/* 6 Moments Interactive Grid (4 across top, 2 on bottom on desktop) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {dayMoments.map((moment, idx) => {
            const isExpanded = expandedIdx === idx;
            const isTopRow = idx < 4;

            return (
              <Reveal
                key={moment.number}
                delay={idx * 60}
                className={cn(
                  "w-full h-full",
                  isTopRow ? "lg:col-span-3" : "lg:col-span-6"
                )}
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onClick={() => toggleCard(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleCard(idx);
                    }
                  }}
                  className={cn(
                    "group relative w-full h-full rounded-2xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between select-none overflow-hidden border",
                    isExpanded
                      ? "bg-maroon text-white shadow-2xl border-maroon/80 scale-[1.01]"
                      : "bg-white/5 hover:bg-white/[0.08] text-white border-white/10 hover:border-white/25 shadow-lg hover:-translate-y-1"
                  )}
                >
                  {/* confirm expanded-line wording with client */}
                  <span
                    className="hidden"
                    dangerouslySetInnerHTML={{
                      __html: "<!-- confirm expanded-line wording with client -->",
                    }}
                  />

                  {/* Top Banner Photo */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-900 shrink-0">
                    {/* replace with REAL ISG campus photo for this moment of the day */}
                    <span
                      className="hidden"
                      dangerouslySetInnerHTML={{
                        __html: "<!-- replace with REAL ISG campus photo for this moment of the day -->",
                      }}
                    />
                    <img
                      src={moment.img}
                      alt={moment.alt}
                      loading="lazy"
                      width={900}
                      height={506}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 relative">
                    {/* Top Accent Bar + Circular Expand/Collapse Button */}
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div
                          className={cn(
                            "h-1 w-12 rounded-full transition-colors duration-300",
                            isExpanded ? "bg-gold" : "bg-maroon"
                          )}
                        />
                        <div
                          className={cn(
                            "flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                            isExpanded
                              ? "bg-white/20 border-white/30 text-white rotate-180"
                              : "bg-white/10 border-white/15 text-white group-hover:bg-white/20"
                          )}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Moment Title */}
                      <h3 className="font-serif text-[21px] sm:text-[23px] font-bold leading-tight text-white">
                        {moment.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-2 font-sans text-[14px] sm:text-[14.5px] leading-relaxed transition-colors duration-300",
                          isExpanded ? "text-white/90" : "text-white/70"
                        )}
                      >
                        {moment.collapsedDesc}
                      </p>
                    </div>

                    {/* Expanded Fuller Line (Always present, toggled via CSS for static generator compatibility) */}
                    <div 
                      className={cn(
                        "transition-all duration-300 overflow-hidden",
                        isExpanded 
                          ? "max-h-[300px] opacity-100 mt-4 pt-3.5 border-t border-white/20" 
                          : "max-h-0 opacity-0 mt-0 pt-0 border-t-0 border-transparent"
                      )}
                    >
                      <div className="relative z-10">
                        <p className="font-sans text-[14.5px] sm:text-[15px] leading-relaxed text-white font-medium">
                          {moment.expandedText}
                        </p>
                      </div>
                    </div>

                    {/* Faint Oversized Background Number (01–06) */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-serif font-bold text-[64px] sm:text-[76px] leading-none absolute bottom-2 right-4 pointer-events-none select-none transition-opacity duration-300",
                        isExpanded ? "text-white/15" : "text-white/[0.05]"
                      )}
                    >
                      {moment.number}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function ExpandingVideoSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const action = isMuted ? "unMute" : "mute";
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: action, args: [] }),
        "*"
      );
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const action = isPlaying ? "pauseVideo" : "playVideo";
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: action, args: [] }),
        "*"
      );
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="bg-[#F8F6F2] py-16 lg:py-24 overflow-hidden border-b border-gray-200/60">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8 text-center mb-10">
        <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-maroon uppercase mb-3">
          STEP INSIDE ISG
        </p>
        <h2 className="font-serif text-[clamp(2.1rem,4.2vw,3.2rem)] font-bold leading-[1.12] text-primary">
          See the school on an ordinary morning.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto font-sans text-[16.5px] leading-relaxed text-slate-600">
          Walk through our Sarusajai campus in the morning light — small classes, bright labs, open lawn and focussed faces.
        </p>
      </div>

      {/* Video Container Card */}
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div
          className="relative mx-auto w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900 shadow-2xl border-2 sm:border-4 border-white aspect-[4/3] sm:aspect-video min-h-[280px] sm:min-h-0 group"
          style={{
            backgroundImage: `url(${campusImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <iframe
            ref={iframeRef}
            src="https://www.youtube.com/embed/1rD4rvMRLv8?autoplay=1&mute=1&loop=1&playlist=1rD4rvMRLv8&controls=0&showinfo=0&rel=0&playsinline=1&enablejsapi=1"
            title="STEP INSIDE ISG - International School Guwahati Campus Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full object-cover border-0"
          />

          {/* Controls Overlay / Compact Play/Pause & Mute Icon Buttons */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2.5">
            {/* Play / Pause Icon Button */}
            <button
              onClick={togglePlay}
              type="button"
              aria-label={isPlaying ? "Pause video" : "Play video"}
              title={isPlaying ? "Pause video" : "Play video"}
              className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-navy/85 hover:bg-navy backdrop-blur-md text-white shadow-xl transition-all duration-300 hover:scale-110 border border-white/25 cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-white" />
              ) : (
                <Play className="h-5 w-5 text-gold fill-gold ml-0.5" />
              )}
            </button>

            {/* Mute / Unmute Icon Button */}
            <button
              onClick={toggleMute}
              type="button"
              aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
              title={isMuted ? "Unmute audio" : "Mute audio"}
              className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-navy/85 hover:bg-navy backdrop-blur-md text-white shadow-xl transition-all duration-300 hover:scale-110 border border-white/25 cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-gold" />
              ) : (
                <Volume2 className="h-5 w-5 text-emerald-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  /* CLIENT CHECK: document says 40+ faculty / ratio 1:12–1:20 / 20+ trips — confirm which figures are current before launch */
  const items = [
    { node: <CountUp to={16} suffix="+" />, label: "years of Cambridge teaching in Guwahati" },
    { node: <span>1:10</span>, label: "teacher student ratio" },
    { node: <CountUp to={90} suffix="%" />, label: "of alumni to top universities in India + Abroad" },
    { node: <CountUp to={20} prefix="Max " />, label: "students per class" },
  ];
  return (
    <section className="bg-[#07132B] py-20 lg:py-28 text-white">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-white/60 uppercase mb-3">
            Track Record
          </p>
          <h2 className="max-w-3xl font-serif text-[clamp(2.1rem,4.2vw,3.2rem)] font-bold leading-[1.12] text-white">
            Numbers we're happy for you to check.
          </h2>
        </Reveal>
        <dl className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {items.map((s, i) => (
            <Reveal key={i} delay={i * 90} className="h-full">
              <div className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-xl border border-white/10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <dt className="flex flex-1 items-center font-serif text-[clamp(2.8rem,5.5vw,4.2rem)] font-extrabold leading-[1.1] text-maroon tracking-tight">
                  {s.node}
                </dt>
                <dd className="mt-4 font-sans text-sm font-medium leading-relaxed text-slate-600">
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

const FACILITIES = [
  {
    title: "Aero Skill Lab",
    desc: "A one-of-a-kind aviation and aerospace skills laboratory where students explore flight simulation, drone technology, and applied aeronautics — unique to ISG in the region.",
    img: "/images/US Nasa tour/NASA 3.jpg",
    alt: "Students working in the ISG Aero Skill Lab with aviation equipment",
    /* <!-- replace with REAL ISG Aero Skill Lab photo --> */
  },
  {
    title: "Computer & AI Labs",
    desc: "Purpose-built AI and computing laboratories equipped for coding, machine learning projects, and digital literacy — preparing students for the technology-driven future.",
    img: "/comp Lab.jpg",
    alt: "Students coding in the ISG Computer and AI laboratory",
    /* <!-- replace with REAL ISG Computer / AI Lab photo --> */
  },
  {
    title: "Science & Mathematics Labs",
    desc: "Dedicated Physics, Chemistry, Biology, and Mathematics laboratories equipped for hands-on Cambridge practical experiments and investigative work.",
    img: "/lab.webp",
    alt: "Students conducting experiments in the ISG science laboratory",
    /* <!-- replace with REAL ISG facility photo --> */
  },
  {
    title: "Modern Classrooms",
    desc: "Air-conditioned, digitally equipped classrooms with interactive boards and smart learning tools — designed for focussed, comfortable, and engaging lessons.",
    img: "/DSC_3722.jpg",
    alt: "ISG students studying in a modern classroom",
    /* <!-- replace with REAL ISG classroom photo --> */
  },
  {
    title: "Well-Stocked Library",
    desc: "A curated collection of international literature, reference materials, and digital study resources in a quiet, inspiring environment for all age groups.",
    img: "/Lib1.jpg",
    alt: "ISG library with bookshelves and student reading areas",
    /* <!-- replace with REAL ISG library photo --> */
  },
  {
    title: "Swimming Pool & Outdoor Sports",
    desc: "Half-Olympic size swimming pool with certified coaches, spacious athletic grounds, and outdoor sports facilities for daily physical activity and competitive training.",
    img: "/SWIMMING PHOTO.webp",
    alt: "Students in the ISG swimming pool with coach supervising",
    /* <!-- replace with REAL ISG facility photo --> */
  },
];

function FacilitiesSection() {
  return (
    <section className="bg-[#F8F6F2] py-20 lg:py-28 text-slate-900 border-b border-gray-200">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-maroon uppercase">
            Campus Facilities
          </p>
          <h2 className="mt-5 max-w-3xl font-serif text-[clamp(2.1rem,4.2vw,3.2rem)] font-bold leading-[1.12] text-primary">
            Everything a curious child needs, on one campus.
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-[17px] leading-relaxed text-slate-700">
            From science labs to theatre stages and sports arena, our facilities are built to support hands-on learning, athletic growth, and creative expression.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {FACILITIES.map((f, i) => (
            <Reveal key={f.title} delay={i * 70} className="h-full">
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative w-full overflow-hidden bg-slate-100">
                  {/* replace with REAL ISG campus/student photo — stock placeholder harms trust */}
                  <span
                    className="hidden"
                    dangerouslySetInnerHTML={{ __html: "<!-- replace with REAL ISG campus/student photo — stock placeholder harms trust -->" }}
                  />
                  <img
                    src={f.img}
                    alt={f.alt}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ aspectRatio: '16 / 10' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-serif text-[21px] font-bold text-primary">{f.title}</h3>
                    <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-slate-600">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Boarding / Hostel Info Band
   ========================================================================== */
function BoardingInfoBand() {
  return (
    <section className="bg-[#07132B] py-10 lg:py-12 border-b border-white/10">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maroon/20 text-maroon">
          <Building2 className="h-6 w-6 text-white/80" />
        </div>
        <div>
          {/* <!-- confirm boarding details and capacity with client --> */}
          <span
            className="hidden"
            dangerouslySetInnerHTML={{ __html: '<!-- confirm boarding details and capacity with client -->' }}
          />
          <p className="font-serif text-[clamp(1.1rem,2vw,1.35rem)] font-bold text-white leading-snug">
            On-Campus Boarding Available
          </p>
          <p className="mt-1.5 font-sans text-[15px] leading-relaxed text-gray-300">
            For families beyond Guwahati, separate on-campus boarding for boys and girls is available from Grade VIII — a supportive home alongside school.
          </p>
        </div>
      </div>
    </section>
  );
}

function ValuesExplorer() {
  /*
   * CLIENT REVIEW: These five values match the official Cambridge Learner Attributes.
   * The short descriptor text is ISG's own paraphrased wording, not the official Cambridge definitions.
   * See the VALUES array comment near the top of this file for the official Cambridge wording.
   * If the client prefers official wording, update the 'text' fields accordingly.
   */
  const valueItems = [
    {
      title: "Reflective",
      text: "Can look honestly at their own work and say what to do better.",
      icon: RotateCcw,
    },
    {
      title: "Innovative",
      text: "Approaches problems with curiosity and fresh ideas.",
      icon: Lightbulb,
    },
    {
      title: "Confident",
      text: "Speaks up, tries, and isn't afraid to be wrong.",
      icon: MessageSquare,
    },
    {
      title: "Engaged",
      text: "Genuinely interested — in class and in the world.",
      icon: Globe,
    },
    {
      title: "Responsible",
      text: "Owns their choices, and cares about others.",
      icon: Handshake,
    },
  ];

  return (
    <section className="bg-[#F8F6F2] py-16 lg:py-24 border-b border-gray-200/80">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        
        {/* Section Header */}
        <Reveal>
          <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-maroon uppercase">
            WHAT WE GROW
          </p>
          <h2 className="mt-3 max-w-2xl font-serif text-[clamp(2.1rem,4.2vw,3.2rem)] font-bold leading-[1.12] text-primary">
            Five words we'd like your child to be described by at eighteen.
          </h2>
        </Reveal>

        {/* Core Values Cards & Circular Badge Row */}
        <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_280px] gap-6 lg:gap-8 items-center">
          
          {/* Row of 5 Core Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 items-stretch">
            {valueItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <Reveal key={item.title} delay={idx * 60} className="h-full">
                  <div className="group h-full rounded-2xl border border-gray-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maroon/10 text-maroon mb-4 transition-colors duration-300 group-hover:bg-maroon group-hover:text-white">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-[18px] font-bold text-primary leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 font-sans text-[13px] leading-relaxed text-slate-600 flex-1 flex items-center justify-center">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Right Column: Circular Photo Badge (Vertically Centered with Cards) */}
          <Reveal delay={120} className="w-full flex justify-center">
            <div className="flex flex-col items-center text-center shrink-0 mt-4 lg:mt-0">
              <div className="relative group">
                <span
                  className="hidden"
                  dangerouslySetInnerHTML={{ __html: "<!-- replace with REAL ISG student photo -->" }}
                />
                <div className="h-52 w-52 sm:h-60 sm:w-60 lg:h-64 lg:w-64 xl:h-72 xl:w-72 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white transition-transform duration-500 group-hover:scale-[1.02]">
                  <img
                    src={dayLesson}
                    alt="ISG primary students engaged in classroom learning activity"
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Overlaid Badge Pill */}
                <div className="-mt-10 sm:-mt-12 relative z-10 mx-auto max-w-[230px] sm:max-w-[250px] rounded-2xl bg-[#07132B] px-4 py-3 sm:py-3.5 text-white shadow-xl border border-white/10 text-center">
                  <h4 className="font-serif text-[13.5px] sm:text-[14.5px] font-bold leading-snug text-white">
                    Education with pleasure, not pressure
                  </h4>
                  <p className="mt-1 font-sans text-[10px] sm:text-[10.5px] font-bold tracking-widest text-gold uppercase">
                    Mind · Character · Growth
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
}

function ApproachTagline() {
  return (
    <section className="relative py-20 lg:py-28 text-white text-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/CISG.webp"
          alt="International School Guwahati CISG Campus Building"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/75 via-maroon/60 to-maroon/75" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-gold uppercase mb-4">
            Our Approach to Learning
          </p>
          <h2 className="mx-auto max-w-4xl font-serif text-[clamp(2.2rem,4.8vw,3.8rem)] font-bold leading-[1.15] text-white drop-shadow-lg">
            "In this school, mistakes are expected, respected, inspected and corrected."
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

function Outcomes() {
  return (
    <section className="bg-[#07132B] py-14 lg:py-20 text-white border-b border-white/10">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-white/60 uppercase mb-3">
            WHERE THEY GO NEXT
          </p>
          <h2 className="max-w-3xl font-serif text-[clamp(2.1rem,4.2vw,3.2rem)] font-bold leading-[1.12] text-white">
            Ninety per cent of our passed-out students go on to universities abroad.
          </h2>
          <p className="mt-4 max-w-2xl font-sans text-[17px] leading-relaxed text-white/80">
            A map of where sixteen years have taken them — abroad and at home.
          </p>
        </Reveal>

        {/* Global & National Placement Map */}
        <Reveal delay={100}>
          <div className="mt-10 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-white shadow-2xl p-2 sm:p-4">
            <img
              src="/isg-world-map.webp"
              alt="International School Guwahati alumni map showing university placements across India and worldwide"
              loading="lazy"
              width={1920}
              height={1282}
              className="w-full h-auto rounded-xl sm:rounded-2xl object-contain"
            />
          </div>
        </Reveal>

        {/* Compact Stat Grid: 4 columns on desktop, 2x2 on mobile */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.region} delay={i * 70}>
              <div className="h-full rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 shadow-sm">
                <p className="font-serif text-[clamp(2.4rem,4.2vw,3.4rem)] font-extrabold text-gold leading-none">
                  <CountUp to={parseInt(d.pct.replace('%', ''))} suffix="%" />
                </p>
                <p className="mt-4 font-sans text-[14px] font-bold text-white uppercase tracking-wider">
                  {d.region}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Local Parent Reassurance Line */}
        <Reveal delay={200}>
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="max-w-3xl font-sans text-[15.5px] leading-relaxed text-white/85 font-medium">
              Whether the goal is a university abroad or one of India's best, every A Level student receives individual guidance from Grade 11.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StudentAchievement() {
  return (
    <section className="bg-[#F8F6F2] py-14 lg:py-20 border-b border-gray-200/80">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-maroon uppercase mb-3">
              STUDENT ACHIEVEMENTS
            </p>
            <h2 className="font-serif text-[clamp(2.1rem,4vw,3.2rem)] font-bold leading-[1.12] text-primary">
              Celebrating student achievements & milestones.
            </h2>
            <p className="mt-3 font-sans text-[15.5px] leading-relaxed text-slate-600">
              From world records in speed-cubing to academic & co-curricular milestones. Hover or tap any photo box below to view details.
            </p>
          </div>
        </Reveal>

        {/* 4 Image Placeholder Box Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {ACHIEVEMENT_IMAGES.map((item, idx) => (
            <Reveal key={item.label} delay={idx * 70}>
              <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer h-full min-h-[260px] md:min-h-[300px]">
                
                <img
                  src={item.img}
                  alt={item.alt}
                  width={600}
                  height={450}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Base State Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-between transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                  <span className="self-start rounded-full bg-maroon/90 px-3 py-1 font-sans text-[10.5px] font-bold tracking-[0.15em] text-white uppercase shadow-sm">
                    {item.tag}
                  </span>
                  <div className="text-white">
                    <p className="font-serif text-[16px] font-bold leading-snug">
                      {item.label}
                    </p>
                    <p className="text-[11.5px] font-sans text-white/80 mt-1">
                      Hover to view details →
                    </p>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07132B] via-[#07132B]/95 to-[#07132B]/85 p-6 flex flex-col justify-center text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 ease-in-out">
                  <p className="text-[10.5px] font-sans font-bold tracking-[0.2em] text-gold uppercase mb-1.5">
                    {item.category}
                  </p>
                  <h3 className="font-serif text-[17px] font-bold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-sans text-[13.5px] leading-relaxed text-white/90">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-white py-20 lg:py-28 border-b border-gray-100">
      {/* confirm exact testimonial wording and permission with client */}
      <span
        className="hidden"
        dangerouslySetInnerHTML={{ __html: "<!-- confirm exact testimonial wording and permission with client -->" }}
      />
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-maroon uppercase mb-3">Parent & Student Voices</p>
          <h2 className="max-w-3xl font-serif text-[clamp(2.1rem,4.2vw,3.2rem)] font-bold leading-[1.12] text-primary">
            What families say when we're not in the room.
          </h2>
        </Reveal>

        {/* Mobile Carousel / Desktop Grid */}
        <div className="mt-12">
          <div className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-0 scrollbar-none -mx-5 px-5 md:mx-0 md:px-0">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="min-w-[85%] sm:min-w-[75%] md:min-w-0 snap-center shrink-0 md:shrink">
                <Reveal delay={i * 80} className="h-full">
                  <figure className="h-full rounded-2xl border border-gray-200/80 bg-[#F8F6F2] p-8 lg:p-10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
                    <div>
                      <span aria-hidden="true" className="font-serif text-5xl leading-none text-maroon block mb-1">
                        "
                      </span>
                      <blockquote className="font-serif text-[18px] sm:text-[19.5px] font-medium leading-relaxed text-primary">
                        {t.quote}
                      </blockquote>
                    </div>

                    <figcaption className="mt-8 flex items-center gap-4 pt-4 border-t border-gray-200/60">
                      {/* replace with real photo */}
                      <span
                        className="hidden"
                        dangerouslySetInnerHTML={{ __html: "<!-- replace with real photo -->" }}
                      />
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-maroon/10 border-2 border-maroon/20 font-serif font-bold text-maroon text-base shadow-xs"
                        aria-label={`Photo of ${t.name}`}
                      >
                        {t.initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans text-[15px] font-bold text-primary">
                          {t.name}
                        </span>
                        <span className="font-sans text-[13px] font-semibold text-slate-500">
                          {t.role}
                        </span>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              </div>
            ))}
          </div>

          {/* Mobile Swipe Cue Dots */}
          <div className="mt-2 flex justify-center gap-2 md:hidden" aria-hidden="true">
            {TESTIMONIALS.map((_, i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-full bg-maroon/30"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoExperiences() {
  const [activeTab, setActiveTab] = useState<"all" | "parent" | "student">("all");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // Helper to safely extract YouTube video ID from any format (URL, Shorts, or ID)
  const getYouTubeId = (urlOrId: string) => {
    if (!urlOrId) return "";
    const match = urlOrId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    return match ? match[1] : urlOrId.trim();
  };

  // Video stories data - only real student and parent stories
  const VIDEO_TESTIMONIALS = [
    {
      id: "parent-neet",
      youtubeUrl: "https://youtube.com/shorts/QNru5TcKuFI?feature=share",
      title: "Cracked NEET Without Coaching | Assam Medical College",
      speaker: "Dr. Pranam Jyoti Das",
      role: "Father of Arunadri Das (Assam Medical College)",
      category: "parent" as const,
      quote: "She cracked NEET and secured a seat at Assam Medical College without any external coaching. The guidance and academic support at ISG were more than sufficient.",
    },
    {
      id: "student-dhruv",
      youtubeUrl: "https://youtu.be/3NGuUlAsDg4",
      title: "From ISG Guwahati to Trinity College Dublin",
      speaker: "Dhruv",
      role: "ISG Alumnus (Class of 2022) • 3rd Year, Trinity College Dublin, Ireland",
      category: "student" as const,
      quote: "My time at ISG prepared me really well for college. The IGCSE, AS and A Level curriculum gave me a strong analytical foundation and taught me how to think independently and critically.",
    },
    {
      id: "student-analytics",
      youtubeUrl: "https://youtube.com/shorts/Jd1R-UyNZG0?feature=share",
      title: "Cambridge A Levels to Business Analytics",
      speaker: "Priyanshu Bhattacharya",
      role: "ISG Alumnus (PGDM Business Analytics, PIBM Pune)",
      category: "student" as const,
      quote: "ISG provided a strong academic foundation that sparked my analytical thinking, while giving me opportunities to hone leadership and communication.",
    },
  ];

  const filteredVideos = activeTab === "all"
    ? VIDEO_TESTIMONIALS
    : VIDEO_TESTIMONIALS.filter((v) => v.category === activeTab);

  return (
    <section className="bg-[#F8F6F2] py-20 lg:py-28 border-b border-gray-200/60 relative overflow-hidden" id="video-experiences">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-gray-200">
          <Reveal>
            <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-maroon uppercase mb-3">
              COMMUNITY STORIES & EXPERIENCES
            </p>
            <h2 className="max-w-2xl font-serif text-[clamp(2.1rem,4.2vw,3.2rem)] font-bold leading-[1.12] text-primary">
              Hear from our students and parents.
            </h2>
            <p className="mt-4 max-w-xl font-sans text-[16px] sm:text-[17px] leading-relaxed text-slate-600">
              Watch authentic reflections from families and learners on their Cambridge journey at International School Guwahati.
            </p>
          </Reveal>

          {/* Filter Pills */}
          <Reveal delay={100} className="shrink-0">
            <div className="inline-flex rounded-full bg-white p-1.5 shadow-xs border border-gray-200">
              <button
                type="button"
                data-video-tab="all"
                onClick={() => setActiveTab("all")}
                className={cn(
                  "px-5 sm:px-6 py-2.5 text-[13px] sm:text-[14px] font-sans font-bold rounded-full transition-all duration-300 cursor-pointer",
                  activeTab === "all"
                    ? "bg-maroon text-white shadow-sm"
                    : "text-slate-600 hover:text-navy"
                )}
              >
                All Stories ({VIDEO_TESTIMONIALS.length})
              </button>
              <button
                type="button"
                data-video-tab="parent"
                onClick={() => setActiveTab("parent")}
                className={cn(
                  "px-5 sm:px-6 py-2.5 text-[13px] sm:text-[14px] font-sans font-bold rounded-full transition-all duration-300 cursor-pointer",
                  activeTab === "parent"
                    ? "bg-maroon text-white shadow-sm"
                    : "text-slate-600 hover:text-navy"
                )}
              >
                Parents
              </button>
              <button
                type="button"
                data-video-tab="student"
                onClick={() => setActiveTab("student")}
                className={cn(
                  "px-5 sm:px-6 py-2.5 text-[13px] sm:text-[14px] font-sans font-bold rounded-full transition-all duration-300 cursor-pointer",
                  activeTab === "student"
                    ? "bg-maroon text-white shadow-sm"
                    : "text-slate-600 hover:text-navy"
                )}
              >
                Students
              </button>
            </div>
          </Reveal>
        </div>

        {/* Video Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 items-stretch">
          {filteredVideos.map((video, idx) => {
            const ytId = getYouTubeId(video.youtubeUrl);
            const thumbUrl = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "";
            const isPlaying = playingVideoId === video.id;

            return (
              <Reveal key={video.id} delay={idx * 70} className="h-full">
                <div
                  data-video-id={ytId}
                  data-video-title={video.title}
                  data-category={video.category}
                  className="video-story-card group flex flex-col h-full overflow-hidden rounded-2xl bg-white border border-gray-200/90 shadow-sm transition-all duration-300 hover:shadow-2xl text-left"
                >
                  {/* Large Video Thumbnail / Inline Player Wrapper */}
                  <div className="relative h-64 sm:h-72 lg:h-80 w-full overflow-hidden bg-slate-900 shrink-0 video-player-container">
                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="h-full w-full border-0"
                      />
                    ) : (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setPlayingVideoId(video.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setPlayingVideoId(video.id);
                          }
                        }}
                        className="h-full w-full relative cursor-pointer group/thumb"
                      >
                        {thumbUrl && (
                          <img
                            src={thumbUrl}
                            alt={video.title}
                            loading="lazy"
                            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 transition-opacity group-hover:opacity-90" />

                        {/* Category Pill */}
                        <span className="absolute top-4 left-4 rounded-full bg-black/65 backdrop-blur-md px-3.5 py-1.5 font-sans text-[11px] font-bold tracking-wider text-white uppercase border border-white/20 shadow-sm pointer-events-none">
                          {video.category === "parent" ? "Parent Story" : "Student Story"}
                        </span>

                        {/* Prominent Play Button Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            type="button"
                            aria-label={`Play ${video.title}`}
                            className="inline-play-btn flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-maroon text-white shadow-2xl transition-all duration-300 group-hover:scale-115 group-hover:bg-gold group-hover:text-navy border-2 border-white/60 cursor-pointer"
                          >
                            <Play className="h-7 w-7 fill-current ml-1" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-serif text-[18px] sm:text-[20px] font-bold leading-snug text-primary transition-colors group-hover:text-maroon">
                        {video.title}
                      </h3>
                      <p className="mt-3 font-sans text-[14px] sm:text-[14.5px] leading-relaxed text-slate-600 line-clamp-3">
                        "{video.quote}"
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-maroon/10 border border-maroon/20 font-serif font-bold text-maroon text-base">
                        {video.speaker.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-sans text-[14.5px] font-bold text-primary truncate">
                          {video.speaker}
                        </p>
                        <p className="font-sans text-[12.5px] font-medium text-slate-500 truncate">
                          {video.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className="bg-[#07132B] py-20 lg:py-28 text-white">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-gold uppercase">
            School Leadership
          </p>
          <h2 className="mt-5 max-w-3xl font-serif text-[clamp(2.1rem,4.2vw,3.2rem)] font-bold leading-[1.12] text-white">
            Guided by dedicated leaders and experienced educators.
          </h2>
        </Reveal>

        {/* Dean of Academics Message (Top of School Leadership) */}
        <Reveal delay={80}>
          <div className="mt-12 rounded-2xl bg-white/5 border border-white/10 p-7 lg:p-10 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-gold uppercase">
                    From the Dean of Academics
                  </p>
                  <blockquote className="mt-4 font-serif text-[clamp(1.5rem,2.5vw,2.1rem)] font-bold leading-snug text-white">
                    "Cambridge education inspires curiosity. We guide students to ask deep questions, master concepts, and learn with confidence."
                  </blockquote>
                  <p className="mt-4 font-sans text-[15.5px] leading-relaxed text-white/80">
                    Through small class sizes and personalized academic support, our faculty ensures that every student's learning journey is both challenging and deeply rewarding.
                  </p>
                </div>
                <p className="mt-6 font-sans text-[15px] font-semibold text-gold border-t border-white/10 pt-4">
                  Dr. Pulak Bhattacharyya <span className="block text-[13px] font-normal text-white/60">Dean of Academics</span>
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/15 bg-black/40">
                  <iframe
                    src="https://www.youtube.com/embed/4r_BuOtOGPA"
                    title="Dr. Pulak Bhattacharyya - Dean of Academics, ISG"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Chairman & CEO Messages Grid */}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* Chairman Card */}
          <Reveal delay={120}>
            <div className="h-full flex flex-col justify-between rounded-2xl bg-white/5 border border-white/10 p-8 shadow-lg">
              <div>
                <div className="flex flex-col sm:flex-row gap-6 items-start mb-4">
                  <div className="overflow-hidden rounded-xl w-32 h-36 shrink-0 border border-white/10 shadow-md">
                    <img
                      src={newChairmanImg}
                      alt="The Chairman of International School Guwahati"
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-gold uppercase">
                      A message from our Chairman
                    </p>
                    <blockquote className="mt-2 font-serif text-[18px] font-bold leading-snug text-white">
                      "The aim of education should be to teach the child to think, not what to think."
                    </blockquote>
                  </div>
                </div>
                <p className="mt-2 font-sans text-[15px] leading-relaxed text-white/75">
                  When we founded ISG in 2010, Guwahati had no Cambridge school. We began with a simple conviction: that children learn most deeply when they are enjoying themselves, and that a child under pressure learns only how to survive pressure.
                </p>
              </div>
              <p className="mt-6 font-sans text-[15px] font-semibold text-gold border-t border-white/10 pt-4">
                Chairman <span className="block text-[13px] font-normal text-white/60">NR Education Foundation</span>
              </p>
            </div>
          </Reveal>

          {/* CEO Card */}
          <Reveal delay={160}>
            <div className="h-full flex flex-col justify-between rounded-2xl bg-white/5 border border-white/10 p-8 shadow-lg">
              <div>
                <div className="flex flex-col sm:flex-row gap-6 items-start mb-4">
                  <div className="overflow-hidden rounded-xl w-32 h-36 shrink-0 border border-white/10 shadow-md">
                    <img
                      src={newCeoImg}
                      alt="Mr. Krishnamurthy Patnaik, Chief Executive Officer of International School Guwahati"
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-gold uppercase">
                      From the Chief Executive Officer
                    </p>
                    <blockquote className="mt-2 font-serif text-[18px] font-bold leading-snug text-white">
                      "Our goal is to foster an environment where academic rigour meets character development, empowering every student to thrive."
                    </blockquote>
                  </div>
                </div>
                <p className="mt-2 font-sans text-[15px] leading-relaxed text-white/75">
                  We focus on holistic education that equips students with real-world capabilities, critical thinking skills, and global perspectives essential for higher education and beyond.
                </p>
              </div>
              <p className="mt-6 font-sans text-[15px] font-semibold text-gold border-t border-white/10 pt-4">
                Mr. Krishnamurthy Patnaik <span className="block text-[13px] font-normal text-white/60">Chief Executive Officer</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Admissions() {
  return (
    <section className="bg-[#F8F6F2] py-20 lg:py-28 text-slate-900 border-b border-gray-200">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-maroon uppercase">
            The admissions journey
          </p>
          <h2 className="mt-5 max-w-3xl font-serif text-[clamp(2.1rem,4.2vw,3.2rem)] font-bold leading-[1.12] text-primary">
            Five unhurried steps, and someone with you at each one.
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-6 md:grid-cols-5">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80}>
              <div className="h-full rounded-2xl bg-white p-6 border-t-4 border-maroon shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <p className="font-serif text-[16px] font-bold text-maroon">{s.n}</p>
                <h3 className="mt-2 font-serif text-[22px] font-bold text-primary">{s.t}</h3>
                <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-slate-600">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200}>
          <div className="mt-14 grid gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:grid-cols-3">
            {[
              ["Academic year", "Begins in April"],
              ["Admissions open", "From October"],
              ["Fees", "Shared on request · sibling discounts available"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[11px] font-sans font-bold tracking-[0.2em] text-maroon uppercase">{k}</p>
                <p className="mt-2 font-serif text-[20px] font-bold text-primary">{v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Enquiry() {
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#enquire") {
      setFormOpen(true);
    }
  }, []);

  return (
    <section id="enquire" className="scroll-mt-24 bg-[#F8F6F2] py-20 lg:py-28 border-t border-gray-200">
      {/* insert real phone and email — confirm with client */}
      <span
        className="hidden"
        dangerouslySetInnerHTML={{ __html: "<!-- insert real phone and email — confirm with client -->" }}
      />
      {/* confirm grade-band seat availability wording with client */}
      <span
        className="hidden"
        dangerouslySetInnerHTML={{ __html: "<!-- confirm grade-band seat availability wording with client -->" }}
      />
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 lg:grid-cols-[1fr_1fr] lg:items-start lg:px-8">
        {/* Left Column: Warm Invitation & Grade Status */}
        <Reveal>
          <div>
            <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-maroon uppercase mb-3">
              ADMISSIONS ENQUIRY
            </p>
            <h2 className="font-serif text-[clamp(2.1rem,4.2vw,3.2rem)] font-bold leading-[1.12] text-primary">
              See it for yourself. Then decide.
            </h2>
            <p className="mt-6 font-sans text-[17px] leading-relaxed text-slate-700">
              One form, one conversation — we call you back the same day.
            </p>

            {/* Grade-band Status Lines with Colored Dot Markers */}
            <div className="mt-8 space-y-3.5 pt-6 border-t border-gray-200/80">
              <div className="flex items-start gap-3">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500 shadow-2xs" aria-hidden="true" />
                <p className="font-sans text-[15px] font-medium text-slate-800">
                  Early Years to Primary — places open now.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500 shadow-2xs" aria-hidden="true" />
                <p className="font-sans text-[15px] font-medium text-slate-800">
                  Lower Secondary — waitlist open.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-maroon shadow-2xs" aria-hidden="true" />
                <p className="font-sans text-[15px] font-medium text-slate-800">
                  IGCSE & A Level — register your interest.
                </p>
              </div>
            </div>

            {/* Direct Contact Line & Campus Info */}
            <div className="mt-8 pt-6 border-t border-gray-200/80 font-sans text-[14.5px] text-slate-600 space-y-3">
              <p>
                Prefer to talk? Call{" "}
                <a href="tel:+918099367343" className="font-bold text-primary underline underline-offset-2 hover:text-maroon transition-colors">
                  +91 80993 67343
                </a>{" "}
                /{" "}
                <a href="tel:+919181119796" className="font-bold text-primary underline underline-offset-2 hover:text-maroon transition-colors">
                  +91 91811 19796
                </a>{" "}
                or email{" "}
                <a href="mailto:info@internationalschoolguwahati.com" className="font-bold text-primary underline underline-offset-2 hover:text-maroon transition-colors">
                  info@internationalschoolguwahati.com
                </a>.
              </p>

              <div className="text-[13.5px] text-slate-500 pt-1">
                <p><strong className="text-slate-700 font-semibold">Campus:</strong> Nalapara, Kalimandir Path, Sarusajai, Guwahati-781040</p>
                <p><strong className="text-slate-700 font-semibold">Office Hours:</strong> Mon–Sat, 8:30am – 4:00pm</p>
              </div>

              {/* Floating WhatsApp Action Button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/919435049200?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20admissions%20at%20ISG."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-2.5 text-[13.5px] font-bold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-[#20ba59]"
                >
                  <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.099 4.018 4.103-1.076z"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Floating White Enquiry Card */}
        <Reveal delay={100}>
          <div className="rounded-2xl border border-gray-200/80 bg-white p-8 lg:p-10 shadow-md flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-sans font-bold tracking-[0.25em] text-maroon uppercase mb-2">
                TAKES TWO MINUTES
              </p>
              <h3 className="font-serif text-[clamp(1.75rem,3vw,2.2rem)] font-bold text-primary leading-snug">
                Book a campus tour.
              </h3>
              <p className="mt-3 font-sans text-[15.5px] leading-relaxed text-slate-600">
                Tell us a little, and we'll find a time that suits you.
              </p>
            </div>

            <div className="mt-8 enquiry-container">
              {/* Button State */}
              <div className="space-y-4 enquiry-button-wrapper block">
                <button
                  type="button"
                  className="open-enquiry-btn w-full rounded-full bg-maroon px-8 py-4 font-sans text-[15.5px] font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-maroon/90 active:scale-[0.98] cursor-pointer"
                >
                  Open the enquiry form
                </button>
                <p className="text-center text-[13px] font-medium text-slate-500">
                  Seen only by our admissions team.
                </p>
              </div>

              {/* Form State (Hidden initially) */}
              <div className="space-y-4 enquiry-form-wrapper hidden">
                <EnquiryForm />
                <p className="text-center text-[13px] font-medium text-slate-500 border-t border-gray-100 pt-3">
                  Seen only by our admissions team.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
