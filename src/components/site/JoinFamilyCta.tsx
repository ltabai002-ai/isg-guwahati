import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

// Asset imports
import dayLesson from "@/assets/day-lesson.jpg";
import campusImg from "@/assets/campus.jpg";
import dayHome from "@/assets/day-home.jpg";

interface JoinFamilyCtaProps {
  heading?: string;
  className?: string;
}

export function JoinFamilyCta({
  heading = "Ready to join the ISG family?",
  className = "",
}: JoinFamilyCtaProps) {
  const cards = [
    {
      title: "Enquire",
      description:
        "Learn more about an ISG education and start the conversation. We'd love to hear about your child.",
      href: "/admissions",
      hash: "enquire",
      img: dayLesson,
      alt: "ISG student engaged in classroom discussion",
      comment: "<!-- Placeholder for real student enquiry photo -->",
    },
    {
      title: "Visit",
      description:
        "Our school is best seen on an ordinary morning. Book a personal campus tour and see the ISG difference for yourself.",
      href: "/admissions",
      hash: "enquire",
      img: "/aboutusphoto.webp",
      alt: "ISG school campus exterior lawn and main building",
      comment: "<!-- Placeholder for real campus visit photo -->",
    },
    {
      title: "Apply",
      description:
        "Ready to begin? Start your child's admission and find their place in the ISG community.",
      href: "/admissions",
      hash: undefined,
      img: dayHome,
      alt: "ISG student working happily on assignments",
      comment: "<!-- Placeholder for real student admission photo -->",
    },
  ];

  return (
    <section className={`bg-sand py-20 lg:py-28 overflow-hidden ${className}`}>
      <div className="mx-auto max-w-[1140px] px-5 lg:px-8">
        <Reveal>
          <h2 className="font-serif text-[clamp(1.8rem,3.2vw,2.75rem)] leading-tight text-navy font-bold text-center mb-12 lg:mb-16">
            {heading}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {cards.map((card, idx) => (
            <Reveal key={card.title} delay={idx * 150} className="h-full">
              <Link
                to={card.href}
                hash={card.hash}
                className="group relative block h-[400px] lg:h-[440px] w-full rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-maroon focus:ring-offset-2"
              >
                {/* HTML comment for real photo reference */}
                <span
                  className="hidden"
                  dangerouslySetInnerHTML={{ __html: card.comment }}
                />

                {/* Background Image */}
                <img
                  src={card.img}
                  alt={card.alt}
                  className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* High Contrast Gradient Overlay for WCAG AA compliance */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/95 group-hover:via-black/55" />

                {/* Card Text Content */}
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end text-center z-10">
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-2 transition-transform duration-300 group-hover:translate-y-[-2px]">
                    {card.title}
                  </h3>
                  <p className="text-[14px] lg:text-[15px] leading-relaxed text-white/90 font-normal max-w-[280px] mx-auto">
                    {card.description}
                  </p>
                </div>

                {/* ISG Maroon Accent Bar along bottom edge */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[6px] w-3/4 bg-maroon rounded-t-full transition-all duration-300 group-hover:w-full group-hover:bg-[#a00028]" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
