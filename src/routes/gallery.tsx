import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { PageIntro } from "@/components/site/PageIntro";
import { Reveal } from "@/components/site/Reveal";

import heroImg from "@/assets/hero.jpg";
import dayArrival from "@/assets/day-arrival.jpg";
import dayLesson from "@/assets/day-lesson.jpg";
import dayLab from "@/assets/day-lab.jpg";
import dayPool from "@/assets/day-pool.jpg";
import dayTheatre from "@/assets/day-theatre.jpg";
import dayHome from "@/assets/day-home.jpg";
import campusImg from "@/assets/campus.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Photo Gallery — International School Guwahati" },
      {
        name: "description",
        content:
          "Photographs of everyday life at International School Guwahati: classrooms, laboratories, the swimming pool, the theatre and our Sarusajai campus.",
      },
      { property: "og:title", content: "Photo Gallery — International School Guwahati" },
      {
        property: "og:description",
        content: "Everyday life on campus, in pictures.",
      },
    ],
  }),
  component: Gallery,
});

const PHOTOS = [
  { src: heroImg, alt: "ISG students walking together across the campus lawn at sunset" },
  { src: dayArrival, alt: "A student being welcomed at the school gate in the morning" },
  { src: dayLesson, alt: "A teacher working with a small group of students around a table" },
  { src: dayLab, alt: "Students running an experiment in the science laboratory" },
  { src: dayPool, alt: "Children swimming at the school pool with their coach" },
  { src: dayTheatre, alt: "Students rehearsing a play on the school theatre stage" },
  { src: dayHome, alt: "Students heading home at the end of the school day" },
  { src: campusImg, alt: "Aerial view of the ISG campus at Sarusajai" },
];

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <PageIntro
        eyebrow="Gallery"
        title="Ordinary mornings, which is the best way to judge a school."
        lede="No staged photographs. This is the campus as your child would find it on a working Tuesday."
      />
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-4 px-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {PHOTOS.map((p, i) => (
            <Reveal key={p.alt} delay={(i % 3) * 70}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full overflow-hidden rounded-xl"
                aria-label={`Open larger photo: ${p.alt}`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/95 p-5"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            aria-label="Close photo"
            onClick={() => setOpen(null)}
            className="absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white"
          >
            <X size={20} />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-4xl">
            <img
              src={PHOTOS[open].src}
              alt={PHOTOS[open].alt}
              className="max-h-[75vh] w-full rounded-xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-white/70">
              {PHOTOS[open].alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
