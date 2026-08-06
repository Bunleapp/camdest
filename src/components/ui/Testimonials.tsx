import SectionTitle from "@/components/ui/SectionTitle";
import RatingStars from "@/components/ui/RatingStars";
import FadeIn from "@/components/ui/motion/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/ui/motion/StaggerContainer";

interface Testimonial {
  id: string;
  name: string;
  origin: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Emma R.",
    origin: "United Kingdom",
    quote:
      "Watching the sunrise over Angkor Wat was life-changing. The site descriptions and activity suggestions made planning effortless.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Daniel K.",
    origin: "Germany",
    quote:
      "Koh Rong's beaches were untouched and peaceful. Loved how easy it was to compare eco-tourism spots side by side.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Sopheak M.",
    origin: "Cambodia",
    quote:
      "Visiting Tuol Sleng was heavy but necessary. The historical context provided helped me understand my own country's history better.",
    rating: 4.5,
  },
];

export default function Testimonials() {
  return (
    <section className="container-page py-16 sm:py-24">
      <FadeIn>
        <SectionTitle
          eyebrow="Traveler Stories"
          title="What Visitors Say"
          description="Real experiences from travelers exploring Cambodia's nature, culture, and history."
        />
      </FadeIn>

      <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <StaggerItem key={testimonial.id}>
            <figure className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <RatingStars rating={testimonial.rating} />
              <blockquote className="mt-3 text-sm text-muted">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-foreground">
                {testimonial.name}
                <span className="ml-1 font-normal text-muted">
                  · {testimonial.origin}
                </span>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
