import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { X, ArrowRight, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { cn } from "@/lib/utils";

// Assets



export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Photo Gallery — International School Guwahati" },
      {
        name: "description",
        content:
          "Photographs of everyday life at International School Guwahati: classrooms, laboratories, CPR workshops, Spell-Bee, Annual Day, field trips, and our Sarusajai campus.",
      },
      { property: "og:title", content: "Photo Gallery — International School Guwahati" },
      {
        property: "og:description",
        content: "Everyday life on campus, events, celebrations, and educational excursions in pictures.",
      },
    ],
  }),
  component: GalleryPage,
});

type GalleryPhoto = {
  src: string;
  alt: string;
  title: string;
  category: string;
};

type GalleryItem = GalleryPhoto & {
  isAlbum?: boolean;
  albumPhotos?: GalleryPhoto[];
};

const SUALKUCHI_PHOTOS: GalleryPhoto[] = [
  { src: "/events/Sualkuchi Trip/sualkuchitrip-banner.jpeg", alt: "ISG students on educational field trip at Sualkuchi silk weaving village", title: "Sualkuchi Excursion — Welcome & Orientation", category: "Field Trips & Excursions" },
  { src: "/events/Sualkuchi Trip/04-1.jpeg", alt: "ISG students observing traditional handloom weaving techniques in Sualkuchi", title: "Traditional Handloom Weaving", category: "Field Trips & Excursions" },
  { src: "/events/Sualkuchi Trip/05-3.jpeg", alt: "ISG students exploring Assam silk yarn spinning and craftsmanship", title: "Assam Silk Production Process", category: "Field Trips & Excursions" },
  { src: "/events/Sualkuchi Trip/07.jpeg", alt: "ISG students interacting with local artisans during Sualkuchi field visit", title: "Artisan Interaction & Learning", category: "Field Trips & Excursions" },
  { src: "/events/Sualkuchi Trip/09-1.jpeg", alt: "ISG students inspecting intricate Assam Muga and Pat silk designs", title: "Muga & Pat Silk Craftsmanship", category: "Field Trips & Excursions" },
  { src: "/events/Sualkuchi Trip/10-3.jpeg", alt: "ISG student group photo during Sualkuchi educational excursion", title: "Sualkuchi Excursion Group Photo", category: "Field Trips & Excursions" },
];

const MALAYSIA_TRIP_PHOTOS: GalleryPhoto[] = [
  { src: "/events/Malaysiya-trip/01-4-1.jpeg", alt: "ISG students on international educational tour in Malaysia visiting landmark sites", title: "Malaysia Trip — Landmark & Culture Tour", category: "Field Trips & Excursions" },
  { src: "/events/Malaysiya-trip/02-2-1.jpeg", alt: "ISG student group photo during Malaysia international study visit", title: "Malaysia Trip — Student Group Photo", category: "Field Trips & Excursions" },
];

const INDUSTRIAL_VISIT_PHOTOS: GalleryPhoto[] = [
  { src: "/events/industrial-visit/01-3-1.jpeg", alt: "ISG students observing industrial machinery and manufacturing processes during industrial visit", title: "Industrial Visit — Manufacturing & Factory Inspection", category: "Field Trips & Excursions" },
];

const ANNUAL_DAY_PHOTOS: GalleryPhoto[] = [
  { src: "/events/Annual Day Event and Bhogali Bihu/02-scaled.jpeg", alt: "ISG Annual Day cultural performance and traditional Bihu dance by students", title: "Annual Day & Bhogali Bihu — Stage Performance", category: "Cultural & Celebrations" },
  { src: "/events/Annual Day Event and Bhogali Bihu/06-scaled.jpeg", alt: "Students in traditional Assamese attire during Bhogali Bihu celebrations", title: "Traditional Assamese Bihu Attire", category: "Cultural & Celebrations" },
  { src: "/events/Annual Day Event and Bhogali Bihu/10.jpeg", alt: "Group musical and dance performance on Annual Day stage", title: "Annual Day Group Musical Performance", category: "Cultural & Celebrations" },
  { src: "/events/Annual Day Event and Bhogali Bihu/12.jpeg", alt: "Faculty and student organizers celebrating Bhogali Bihu festivities", title: "Bhogali Bihu Festive Community Gathering", category: "Cultural & Celebrations" },
  { src: "/events/Annual Day Event and Bhogali Bihu/14.jpeg", alt: "Annual Day felicitation and award presentation for outstanding students", title: "Annual Day Award Presentation", category: "Cultural & Celebrations" },
];

const INDEPENDENCE_DAY_PHOTOS: GalleryPhoto[] = [
  { src: "/events/Independenceday-celebration/01-2.jpeg", alt: "ISG Independence Day flag hoisting ceremony and national anthem", title: "Independence Day Flag Hoisting Ceremony", category: "Cultural & Celebrations" },
  { src: "/events/Independenceday-celebration/04.jpeg", alt: "Students performing patriotic songs during 15th August celebrations", title: "Patriotic Song Performance", category: "Cultural & Celebrations" },
  { src: "/events/Independenceday-celebration/10-2.jpeg", alt: "School parade and march past on Sarusajai campus lawn", title: "Independence Day Student Parade", category: "Cultural & Celebrations" },
  { src: "/events/Independenceday-celebration/11.jpeg", alt: "Cultural dance performance celebrating Indian independence", title: "Patriotic Cultural Dance", category: "Cultural & Celebrations" },
  { src: "/events/Independenceday-celebration/12-1.jpeg", alt: "Independence Day group photo with faculty, students, and tricolor flag", title: "Independence Day School Group Photo", category: "Cultural & Celebrations" },
];

const CPR_PHOTOS: GalleryPhoto[] = [
  { src: "/events/School CPR Programme/03.jpeg", alt: "ISG students and staff participating in hands-on CPR and life-saving training", title: "School CPR Programme — Hands-on Practice", category: "Workshops & Safety" },
  { src: "/events/School CPR Programme/05-1.jpeg", alt: "Medical trainer demonstrating correct chest compression technique to students", title: "Medical Instructor CPR Demonstration", category: "Workshops & Safety" },
  { src: "/events/School CPR Programme/06-2.jpeg", alt: "ISG students practicing emergency first aid response procedures", title: "Emergency First Aid Practice", category: "Workshops & Safety" },
  { src: "/events/School CPR Programme/09.jpeg", alt: "Life-saving awareness and emergency response workshop for school community", title: "Life-Saving Awareness Session", category: "Workshops & Safety" },
  { src: "/events/School CPR Programme/13.jpeg", alt: "Students and faculty group photo during CPR & First Aid certification session", title: "CPR Programme Group Certification", category: "Workshops & Safety" },
];

const SPELLBEE_PHOTOS: GalleryPhoto[] = [
  { src: "/events/spell-bee/02-3.jpeg", alt: "ISG Spell-Bee competition stage and participant round", title: "ISG Spell-Bee Championship Stage", category: "Academic Events" },
  { src: "/events/spell-bee/05-2.jpeg", alt: "Student spelling contestant tackling complex vocabulary words on stage", title: "Student Vocabulary Challenge", category: "Academic Events" },
  { src: "/events/spell-bee/06-3-1.jpeg", alt: "Judges panel and contestants during active Spell-Bee elimination round", title: "Spell-Bee Elimination Round", category: "Academic Events" },
  { src: "/events/spell-bee/11-1.jpeg", alt: "Audience and teachers cheering for ISG Spell-Bee participants", title: "Audience & Teacher Support", category: "Academic Events" },
  { src: "/events/spell-bee/13-1.jpeg", alt: "Spell-Bee winner receiving medal and certificate of academic achievement", title: "Winner Award Presentation", category: "Academic Events" },
  { src: "/events/spell-bee/14-2.jpeg", alt: "Group photo of all ISG Spell-Bee contestants and faculty organizers", title: "Spell-Bee Participants Group Photo", category: "Academic Events" },
];

const CAREER_COUNSELLING_PHOTOS: GalleryPhoto[] = [
  { src: "/events/Career Counselling Session/01-1.jpeg", alt: "ISG senior students attending global university career guidance workshop", title: "Career Counselling Session — University Planning", category: "Academic Events" },
  { src: "/events/Career Counselling Session/02-1.jpeg", alt: "Career counsellor advising students on subject choices and university pathways", title: "One-on-One Pathway Guidance", category: "Academic Events" },
];

const FABRE_CASTLE_PHOTOS: GalleryPhoto[] = [
  { src: "/events/Fabre Castle/01-1-1.jpeg", alt: "ISG students participating in outdoor experiential learning at Fabre Castle", title: "Fabre Castle — Outdoor Experiential Activity", category: "Campus & Life" },
  { src: "/events/Fabre Castle/05.jpeg", alt: "Students engaging in team-building activities at Fabre Castle grounds", title: "Team-Building Activity", category: "Campus & Life" },
  { src: "/events/Fabre Castle/06-1.jpeg", alt: "Outdoor nature exploration session during Fabre Castle visit", title: "Outdoor Nature Exploration", category: "Campus & Life" },
  { src: "/events/Fabre Castle/10-1.jpeg", alt: "Students exploring architectural and heritage features of Fabre Castle", title: "Heritage & Architecture Exploration", category: "Campus & Life" },
  { src: "/events/Fabre Castle/14-1.jpeg", alt: "Fabre Castle excursion group photo with ISG students and mentors", title: "Fabre Castle Group Photo", category: "Campus & Life" },
];

const SUMMER_CAMP_PHOTOS: GalleryPhoto[] = [
  { src: "/events/summervacation-2023/WhatsApp-Image-2023-07-06-at-12.12.18.jpeg", alt: "ISG Summer Camp 2023 creative arts and craft workshop", title: "Summer Camp 2023 — Creative Arts & Crafts", category: "Campus & Life" },
  { src: "/events/summervacation-2023/WhatsApp-Image-2023-07-06-at-12.12.20.jpeg", alt: "Students engaging in indoor sports and games during summer camp", title: "Indoor Sports & Games", category: "Campus & Life" },
  { src: "/events/summervacation-2023/WhatsApp-Image-2023-07-06-at-12.12.21-1-1.jpeg", alt: "Summer Camp robotics and STEM workshop session", title: "STEM & Robotics Activity", category: "Campus & Life" },
  { src: "/events/summervacation-2023/WhatsApp-Image-2023-07-06-at-12.12.21-2-2.jpeg", alt: "Music and drama workshop during summer vacation camp", title: "Music & Performing Workshop", category: "Campus & Life" },
  { src: "/events/summervacation-2023/WhatsApp-Image-2023-07-06-at-12.12.22 (1).jpeg", alt: "Students practicing team sports during summer camp 2023", title: "Team Sports Practice", category: "Campus & Life" },
  { src: "/events/summervacation-2023/WhatsApp-Image-2023-07-06-at-12.13.20-1.jpeg", alt: "Creative painting and drawing session during summer vacation", title: "Painting & Drawing Session", category: "Campus & Life" },
  { src: "/events/summervacation-2023/WhatsApp-Image-2023-07-06-at-12.13.23.jpeg", alt: "Summer camp outdoor fitness and fun activities on campus", title: "Outdoor Fitness & Fun Games", category: "Campus & Life" },
  { src: "/events/summervacation-2023/WhatsApp-Image-2023-07-06-at-12.13.26.jpeg", alt: "Summer camp workshop presentation and student showcase", title: "Workshop Showcase & Presentation", category: "Campus & Life" },
  { src: "/events/summervacation-2023/WhatsApp-Image-2023-07-07-at-10.24.50.jpeg", alt: "Students receiving summer camp certificates of participation", title: "Summer Camp Certificate Presentation", category: "Campus & Life" },
  { src: "/events/summervacation-2023/WhatsApp-Image-2023-07-07-at-10.25.12.jpeg", alt: "Summer Camp 2023 group photo with participants and instructors", title: "Summer Camp 2023 Group Photo", category: "Campus & Life" },
];

const ZAMBIA_PHOTOS: GalleryPhoto[] = [
  { src: "/images/Zambia/zambiatour 1.webp", alt: "Zambia Exchange Program", title: "Zambia Exchange Program 1", category: "Field Trips & Excursions" },
  { src: "/images/Zambia/zambiatour 2.webp", alt: "Zambia Exchange Program", title: "Zambia Exchange Program 2", category: "Field Trips & Excursions" },
  { src: "/images/Zambia/zambiatour 3.webp", alt: "Zambia Exchange Program", title: "Zambia Exchange Program 3", category: "Field Trips & Excursions" },
  { src: "/images/Zambia/zambiatour 4.webp", alt: "Zambia Exchange Program", title: "Zambia Exchange Program 4", category: "Field Trips & Excursions" },
  { src: "/images/Zambia/zambiatour.webp", alt: "Zambia Exchange Program", title: "Zambia Exchange Program 5", category: "Field Trips & Excursions" },
  { src: "/images/Zambia/IMG_5508.JPG", alt: "Zambia Exchange Program", title: "Zambia Exchange Program 6", category: "Field Trips & Excursions" },
];

const NASA_PHOTOS: GalleryPhoto[] = [
  { src: "/images/US Nasa tour/1000287076.jpg", alt: "NASA Space Camp", title: "NASA Space Camp", category: "Field Trips & Excursions" },
  { src: "/images/US Nasa tour/1000287078.jpg", alt: "NASA Space Camp", title: "NASA Space Camp", category: "Field Trips & Excursions" },
  { src: "/images/US Nasa tour/DSC00096.JPG", alt: "NASA Space Camp", title: "NASA Space Camp", category: "Field Trips & Excursions" },
  { src: "/images/US Nasa tour/DSC00209.JPG", alt: "NASA Space Camp", title: "NASA Space Camp", category: "Field Trips & Excursions" },
  { src: "/images/US Nasa tour/DSCN1193_Enhanced.JPG", alt: "NASA Space Camp", title: "NASA Space Camp", category: "Field Trips & Excursions" },
  { src: "/images/US Nasa tour/DSCN1204.JPG", alt: "NASA Space Camp", title: "NASA Space Camp", category: "Field Trips & Excursions" },
  { src: "/images/US Nasa tour/DSCN1206_Enhanced.JPG", alt: "NASA Space Camp", title: "NASA Space Camp", category: "Field Trips & Excursions" },
  { src: "/images/US Nasa tour/DSCN1933_Enhanced.JPG", alt: "NASA Space Camp", title: "NASA Space Camp", category: "Field Trips & Excursions" },
  { src: "/images/US Nasa tour/IMG_1597_Enhanced.JPG", alt: "NASA Space Camp", title: "NASA Space Camp", category: "Field Trips & Excursions" },
  { src: "/images/US Nasa tour/NASA 3.jpg", alt: "NASA Space Camp", title: "NASA Space Camp", category: "Field Trips & Excursions" },
  { src: "/images/US Nasa tour/NASA 5 copy.jpg", alt: "NASA Space Camp", title: "NASA Space Camp", category: "Field Trips & Excursions" },
  { src: "/images/US Nasa tour/NASA_Enhanced.jpg", alt: "NASA Space Camp", title: "NASA Space Camp", category: "Field Trips & Excursions" },
];

const PHOTOS: GalleryItem[] = [
  {
    src: "/images/US Nasa tour/NASA_Enhanced.jpg",
    alt: "NASA Space Camp",
    title: "NASA Space Camp",
    category: "Field Trips & Excursions",
    isAlbum: true,
    albumPhotos: NASA_PHOTOS,
  },
  {
    src: "/images/Zambia/zambiatour.webp",
    alt: "Zambia Exchange Program",
    title: "Zambia Exchange Program",
    category: "Field Trips & Excursions",
    isAlbum: true,
    albumPhotos: ZAMBIA_PHOTOS,
  },
  {
    src: "/events/Sualkuchi Trip/sualkuchitrip-banner.jpeg",
    alt: "Educational field trip to Assam's famous silk weaving village Sualkuchi — exploring culture, heritage, and textile craftsmanship.",
    title: "Sualkuchi Educational Trip",
    category: "Field Trips & Excursions",
    isAlbum: true,
    albumPhotos: SUALKUCHI_PHOTOS,
  },
  {
    src: "/events/Malaysiya-trip/02-2-1.jpeg",
    alt: "International educational trip to Malaysia student group photo offering global cultural exposure and international learning experiences.",
    title: "Malaysia International Trip",
    category: "Field Trips & Excursions",
    isAlbum: true,
    albumPhotos: MALAYSIA_TRIP_PHOTOS,
  },
  {
    src: "/events/industrial-visit/01-3-1.jpeg",
    alt: "Field visit to regional manufacturing and industrial units giving practical industrial exposure.",
    title: "Industrial & Factory Visit",
    category: "Field Trips & Excursions",
    isAlbum: true,
    albumPhotos: INDUSTRIAL_VISIT_PHOTOS,
  },
  {
    src: "/events/Annual Day Event and Bhogali Bihu/14.jpeg",
    alt: "Annual Day felicitation and award presentation for outstanding students during Bhogali Bihu and Annual Day celebrations.",
    title: "Annual Day & Bhogali Bihu",
    category: "Cultural & Celebrations",
    isAlbum: true,
    albumPhotos: ANNUAL_DAY_PHOTOS,
  },
  {
    src: "/events/Independenceday-celebration/01-2.jpeg",
    alt: "Flag hoisting ceremony, patriotic march past, and cultural performances on Independence Day at Sarusajai campus.",
    title: "Independence Day Celebration",
    category: "Cultural & Celebrations",
    isAlbum: true,
    albumPhotos: INDEPENDENCE_DAY_PHOTOS,
  },
  {
    src: "/events/School CPR Programme/03.jpeg",
    alt: "Comprehensive CPR and emergency first aid training workshop empowering ISG students and staff with life-saving skills.",
    title: "School CPR Programme",
    category: "Workshops & Safety",
    isAlbum: true,
    albumPhotos: CPR_PHOTOS,
  },
  {
    src: "/events/spell-bee/02-3.jpeg",
    alt: "Annual ISG Spell-Bee competition celebrating vocabulary mastery, spelling excellence, and academic confidence.",
    title: "ISG Spell-Bee Competition",
    category: "Academic Events",
    isAlbum: true,
    albumPhotos: SPELLBEE_PHOTOS,
  },
  {
    src: "/events/Career Counselling Session/01-1.jpeg",
    alt: "Career guidance and global university planning workshop for senior ISG students.",
    title: "Career Counselling Session",
    category: "Academic Events",
    isAlbum: true,
    albumPhotos: CAREER_COUNSELLING_PHOTOS,
  },
  {
    src: "/events/Fabre Castle/01-1-1.jpeg",
    alt: "Outdoor experiential learning and team-building excursion at Fabre Castle.",
    title: "Fabre Castle Excursion",
    category: "Campus & Life",
    isAlbum: true,
    albumPhotos: FABRE_CASTLE_PHOTOS,
  },
  {
    src: "/events/summervacation-2023/WhatsApp-Image-2023-07-06-at-12.12.20.jpeg",
    alt: "Summer Camp 2023 activities featuring indoor sports, games, robotics, STEM, and creative workshops.",
    title: "Summer Camp & Vacation 2023",
    category: "Campus & Life",
    isAlbum: true,
    albumPhotos: SUMMER_CAMP_PHOTOS,
  },
];

const MISC_PHOTOS: GalleryPhoto[] = [
  { src: "/20190717_085636.jpg", alt: "Miscellaneous Event", title: "Campus Photo", category: "Miscellaneous" },
  { src: "/20191003_160211.jpg", alt: "Miscellaneous Event", title: "Campus Photo", category: "Miscellaneous" },
  { src: "/20191114_085625.jpg", alt: "Miscellaneous Event", title: "Campus Photo", category: "Miscellaneous" },
  { src: "/ANNUAL SPORTS.jpg", alt: "Annual Sports", title: "Annual Sports", category: "Miscellaneous" },
  { src: "/back.jpg", alt: "Campus View", title: "Campus View", category: "Miscellaneous" },
  { src: "/Bio.jpg", alt: "Biology Lab", title: "Biology Lab", category: "Miscellaneous" },
  { src: "/Chem.jpg", alt: "Chemistry Lab", title: "Chemistry Lab", category: "Miscellaneous" },
  { src: "/comp Lab.jpg", alt: "Computer Lab", title: "Computer Lab", category: "Miscellaneous" },
  { src: "/DSC_3706.jpg", alt: "Campus Moment", title: "Campus Moment", category: "Miscellaneous" },
  { src: "/DSC_3722.jpg", alt: "Campus Moment", title: "Campus Moment", category: "Miscellaneous" },
  { src: "/DSC_3750.jpg", alt: "Campus Moment", title: "Campus Moment", category: "Miscellaneous" },
  { src: "/DSC_3762.jpg", alt: "Campus Moment", title: "Campus Moment", category: "Miscellaneous" },
  { src: "/DSC_3798.JPG", alt: "Campus Moment", title: "Campus Moment", category: "Miscellaneous" },
  { src: "/DSC_3800.JPG", alt: "Campus Moment", title: "Campus Moment", category: "Miscellaneous" },
  { src: "/DSC_3866.jpg", alt: "Campus Moment", title: "Campus Moment", category: "Miscellaneous" },
  { src: "/front.jpg", alt: "Campus Front", title: "Campus Front", category: "Miscellaneous" },
  { src: "/IMG_1504.JPG", alt: "Event Highlight", title: "Event Highlight", category: "Miscellaneous" },
  { src: "/IMG_1511.JPG", alt: "Event Highlight", title: "Event Highlight", category: "Miscellaneous" },
  { src: "/IMG_1576.JPG", alt: "Event Highlight", title: "Event Highlight", category: "Miscellaneous" },
  { src: "/IMG_5510.JPG", alt: "Event Highlight", title: "Event Highlight", category: "Miscellaneous" },
  { src: "/lab.webp", alt: "Laboratory", title: "Laboratory", category: "Miscellaneous" },
  { src: "/Lib1.jpg", alt: "Library", title: "Library", category: "Miscellaneous" },
  { src: "/NATURE WONDERLAND.jpg", alt: "Nature Wonderland", title: "Nature Wonderland", category: "Miscellaneous" },
  { src: "/pRINCIPALS mEET.jpg", alt: "Principals Meet", title: "Principals Meet", category: "Miscellaneous" },
  { src: "/s pool.jpg", alt: "Swimming Pool", title: "Swimming Pool", category: "Miscellaneous" },
  { src: "/SWIMMING PHOTO.webp", alt: "Swimming Photo", title: "Swimming Photo", category: "Miscellaneous" },
  { src: "/WhatsApp Image 2026-09-07 at 9.25.27 PM.jpeg", alt: "School Event", title: "School Event", category: "Miscellaneous" },
  { src: "/WhatsApp Image 2026-09-07 at 9.25.28 PM.jpeg", alt: "School Event", title: "School Event", category: "Miscellaneous" },
  { src: "/WhatsApp Image 2026-09-07 at 9.25.29 PM.jpeg", alt: "School Event", title: "School Event", category: "Miscellaneous" },
  { src: "/WhatsApp Image 2026-09-07 at 9.25.31 PM (1).jpeg", alt: "School Event", title: "School Event", category: "Miscellaneous" },
  { src: "/WhatsApp Image 2026-09-07 at 9.25.31 PM (2).jpeg", alt: "School Event", title: "School Event", category: "Miscellaneous" },
  { src: "/WhatsApp Image 2026-09-07 at 9.25.31 PM.jpeg", alt: "School Event", title: "School Event", category: "Miscellaneous" },
  { src: "/WhatsApp Image 2026-09-07 at 9.25.32 PM (1).jpeg", alt: "School Event", title: "School Event", category: "Miscellaneous" },
  { src: "/WhatsApp Image 2026-09-07 at 9.25.32 PM.jpeg", alt: "School Event", title: "School Event", category: "Miscellaneous" },
  { src: "/WhatsApp Image 2026-09-07 at 9.40.54 PM.jpeg", alt: "School Event", title: "School Event", category: "Miscellaneous" },
  { src: "/WhatsApp Image 2026-09-07 at 9.49.33 PM.jpeg", alt: "School Event", title: "School Event", category: "Miscellaneous" },
  { src: "/WhatsApp Image 2026-09-07 at 9.49.34 PM (1).jpeg", alt: "School Event", title: "School Event", category: "Miscellaneous" },
  { src: "/WhatsApp Image 2026-09-07 at 9.49.34 PM (2).jpeg", alt: "School Event", title: "School Event", category: "Miscellaneous" },
  { src: "/WhatsApp Image 2026-09-07 at 9.49.34 PM.jpeg", alt: "School Event", title: "School Event", category: "Miscellaneous" },
];

function GalleryPage() {
  const [activeAlbum, setActiveAlbum] = useState<GalleryPhoto[] | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  const handleOpenItem = (item: GalleryItem) => {
    if (item.isAlbum && item.albumPhotos) {
      setActiveAlbum(item.albumPhotos);
      setPhotoIndex(0);
    } else {
      setActiveAlbum([item]);
      setPhotoIndex(0);
    }
  };

  const handleCloseModal = () => {
    setActiveAlbum(null);
    setPhotoIndex(0);
  };

  return (
    <>
      <GalleryHero />
      <GalleryShowcase />
      <PhotoGrid onSelectPhoto={handleOpenItem} />
      <ClosingCTA />

      {activeAlbum !== null && (
        <PhotoModal
          photos={activeAlbum}
          currentIndex={photoIndex}
          onIndexChange={setPhotoIndex}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

function GalleryHero() {
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
          <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-4">
            PHOTO GALLERY
          </p>
          <h1 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] text-white font-bold leading-[1.15] max-w-4xl tracking-tight">
            Everyday life on campus, in pictures.
          </h1>
          <p className="mt-4 text-[16.5px] leading-relaxed text-white/80 font-sans max-w-2xl">
            No staged photographs. This is the campus as your child would find it on a working Tuesday — in classrooms, laboratories, events, celebrations, field trips, and on the Sarusajai fields.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function GalleryShowcase() {
  return (
    <section className="bg-sand pb-16 lg:pb-24">
      <div className="w-full">
        <div className="bg-white rounded-b-[40px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            
            <div className="px-6 py-12 lg:pl-[max(3rem,calc((100vw-1300px)/2))] lg:pr-16 lg:py-20 flex flex-col justify-center">
              <Reveal>
                <p className="text-[13px] tracking-[0.2em] text-maroon font-bold uppercase mb-4">
                  OUR CAMPUS & EXCURSIONS
                </p>
                <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.2] text-[#1a1f2e] font-bold max-w-3xl">
                  Ordinary mornings, celebrations & educational trips.
                </h2>
                <div className="mt-6 space-y-5 text-[15.5px] leading-relaxed text-gray-700 font-sans max-w-3xl">
                  <p>
                    We believe transparency builds genuine confidence. Every photo in our gallery reflects <strong className="text-maroon font-bold">real moments</strong> of learning, discovery, celebrations, safety workshops, competitions, and field excursions across India and abroad.
                  </p>
                  <p>
                    From our <strong className="text-maroon font-bold">Annual Day celebrations</strong> and <strong className="text-maroon font-bold">Independence Day parades</strong> to <strong className="text-maroon font-bold">international tours in Malaysia</strong>, this is daily life at ISG.
                  </p>
                </div>

                {/* Campus Badge */}
                <div className="mt-10 flex items-center justify-start">
                  <div className="flex items-center gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-maroon bg-white text-maroon font-serif font-bold text-2xl shadow-sm">
                      ISG
                    </div>
                    <div className="flex flex-col border-l-2 border-gray-200 pl-5">
                      <span className="font-sans text-[16px] font-bold text-[#1a1f2e] leading-snug">
                        Sarusajai Campus<br />Guwahati, Assam
                      </span>
                      <span className="text-[13px] text-maroon font-semibold mt-1 uppercase tracking-wide">
                        Cambridge International School
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="relative h-[350px] lg:h-full w-full">
              <Reveal delay={100} className="absolute inset-0 w-full h-full">
                <span className="hidden" dangerouslySetInnerHTML={{ __html: '<!-- replace with REAL ISG student photo -->' }} />
                <img 
                  src="/DSC_0091.jpg" 
                  alt="ISG campus and students" 
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

function PhotoGrid({ onSelectPhoto }: { onSelectPhoto: (item: GalleryItem) => void }) {
  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal>
            <p className="text-[12px] tracking-[0.2em] text-maroon font-bold uppercase mb-4">
              PHOTOGRAPHIC ARCHIVE
            </p>
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-[#1a1f2e] font-bold">
              Explore campus life in pictures
            </h2>
          </Reveal>
        </div>

        {/* Photo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PHOTOS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 80}>
              <button
                type="button"
                onClick={() => onSelectPhoto(p)}
                className="group relative block h-[350px] w-full overflow-hidden rounded-2xl shadow-lg border border-border/40 text-left cursor-pointer"
                aria-label={`Open photo album or viewer: ${p.title}`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07132B]/95 via-[#07132B]/55 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                
                <div className="absolute inset-0 p-7 flex flex-col justify-between">
                  <div className="flex items-center justify-between w-full">
                    <span className="rounded-full bg-maroon/90 px-3.5 py-1 font-sans text-[10.5px] font-bold tracking-widest text-white uppercase shadow-xs">
                      {p.category}
                    </span>
                    {p.isAlbum && p.albumPhotos && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/90 px-3 py-1 font-sans text-[11px] font-extrabold tracking-wider text-navy uppercase shadow-xs">
                        <Images className="h-3.5 w-3.5" />
                        <span>{p.albumPhotos.length} PHOTOS</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif text-2.5xl text-white font-bold mb-1.5 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-white/80 text-[13px] font-sans line-clamp-2 leading-relaxed">
                      {p.alt}
                    </p>
                    <div className="mt-4 flex items-center text-white/90 group-hover:text-white transition-colors text-[12.5px] font-bold uppercase tracking-wider">
                      <span>{p.isAlbum ? `View all ${p.albumPhotos?.length} photos` : "Tap to enlarge"}</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
                {/* HIDDEN ALBUM DATA FOR STATIC GENERATOR */}
                {p.isAlbum && p.albumPhotos && (
                  <div className="hidden album-data" style={{ display: 'none' }}>
                    {p.albumPhotos.map((ap, idx) => (
                      <img key={idx} src={ap.src} alt={ap.alt} data-title={ap.title} className="album-photo" />
                    ))}
                  </div>
                )}
              </button>
            </Reveal>
          ))}
        </div>

        {/* Miscellaneous Photos Section */}
        <div className="mt-20 lg:mt-28">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Reveal>
              <p className="text-[12px] tracking-[0.2em] text-maroon font-bold uppercase mb-4">
                OTHER PHOTOS
              </p>
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-[#1a1f2e] font-bold">
                More Campus Memories
              </h2>
            </Reveal>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {MISC_PHOTOS.map((p, i) => (
               <Reveal key={i} delay={(i % 4) * 50}>
                 <button
                   type="button"
                   onClick={() => onSelectPhoto({ ...p, isAlbum: false })}
                   className="group relative block h-[200px] w-full overflow-hidden rounded-xl shadow-md border border-border/40 text-left cursor-pointer focus:outline-none focus:ring-4 focus:ring-maroon"
                   aria-label={`Open photo: ${p.title}`}
                 >
                   <img
                     src={p.src}
                     alt={p.alt}
                     loading="lazy"
                     className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                 </button>
               </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="bg-navy py-20 lg:py-28 overflow-hidden" id="enquiry">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 items-start">
          
          <Reveal>
            <div className="pt-4">
              <p className="text-[12px] tracking-[0.2em] text-gold font-bold uppercase mb-4">
                VISIT ISG
              </p>
              <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] leading-[1.15] text-white font-bold">
                Like what you see? Come see it in person.
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-white/80 font-sans">
                One short form and a real conversation — we'll call you back the same day with a tour slot that fits around your working day. Experience our Sarusajai campus firsthand.
              </p>
              <button
                onClick={() => {
                  const form = document.querySelector('#enquiry form');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth' });
                    (form.querySelector('input') as HTMLElement)?.focus();
                  }
                }}
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-maroon px-8 py-4 text-[15px] font-bold tracking-wide text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-maroon/90 shadow-lg cursor-pointer"
              >
                <span>Book a campus visit</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl">
              <h3 className="font-serif text-2xl text-navy font-bold mb-6">How may we help you?</h3>
              <EnquiryForm />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

function PhotoModal({
  photos,
  currentIndex,
  onIndexChange,
  onClose,
}: {
  photos: GalleryPhoto[];
  currentIndex: number;
  onIndexChange: (idx: number) => void;
  onClose: () => void;
}) {
  const currentPhoto = photos[currentIndex];
  const hasMultiple = photos.length > 1;

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      onIndexChange(currentIndex > 0 ? currentIndex - 1 : photos.length - 1);
    },
    [currentIndex, photos.length, onIndexChange]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      onIndexChange(currentIndex < photos.length - 1 ? currentIndex + 1 : 0);
    },
    [currentIndex, photos.length, onIndexChange]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePrev, handleNext]);

  if (!currentPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer modal"
      className="fixed inset-0 z-[60] flex flex-col items-center justify-between bg-[#07132B]/95 backdrop-blur-md p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between z-10 pt-2 pb-3">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-maroon px-3 py-1 font-sans text-[11px] font-bold tracking-widest text-white uppercase shadow-xs">
            {currentPhoto.category}
          </span>
          {hasMultiple && (
            <span className="font-sans text-[13px] font-semibold text-white/80">
              Photo {currentIndex + 1} of {photos.length}
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label="Close photo viewer"
          onClick={onClose}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/15 cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Photo Area with Left/Right Arrows */}
      <div
        className="relative my-auto flex items-center justify-center max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {hasMultiple && (
          <button
            type="button"
            aria-label="Previous photo"
            onClick={handlePrev}
            className="absolute left-2 sm:-left-12 z-20 grid h-12 w-12 place-items-center rounded-full bg-black/50 border border-white/30 text-white shadow-xl transition-all hover:bg-maroon hover:scale-110 cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <div className="flex flex-col items-center max-w-full">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            className="max-h-[68vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
          />
          <div className="mt-4 text-center max-w-2xl px-4">
            <h4 className="font-serif text-xl sm:text-2xl text-white font-bold leading-snug">
              {currentPhoto.title}
            </h4>
            <p className="mt-1.5 font-sans text-[13.5px] sm:text-[14.5px] text-white/85 leading-relaxed">
              {currentPhoto.alt}
            </p>
          </div>
        </div>

        {hasMultiple && (
          <button
            type="button"
            aria-label="Next photo"
            onClick={handleNext}
            className="absolute right-2 sm:-right-12 z-20 grid h-12 w-12 place-items-center rounded-full bg-black/50 border border-white/30 text-white shadow-xl transition-all hover:bg-maroon hover:scale-110 cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Thumbnail Bar for Albums */}
      {hasMultiple && (
        <div
          className="w-full max-w-3xl flex items-center justify-center gap-3 overflow-x-auto py-3 px-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs z-10 scrollbar-none"
          onClick={(e) => e.stopPropagation()}
        >
          {photos.map((pt, idx) => (
            <button
              key={pt.src}
              type="button"
              onClick={() => onIndexChange(idx)}
              className={cn(
                "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all cursor-pointer",
                idx === currentIndex
                  ? "border-maroon scale-105 shadow-md ring-2 ring-maroon/50"
                  : "border-white/20 opacity-60 hover:opacity-100"
              )}
            >
              <img src={pt.src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
