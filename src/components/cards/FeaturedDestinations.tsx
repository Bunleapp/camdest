import { fetchDestinations } from "@/services/destinationService";
import DestinationCard from "@/components/cards/DestinationCard";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/motion/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/ui/motion/StaggerContainer";

export default async function FeaturedDestinations() {
  const destinations = await fetchDestinations();

  const popular = destinations
    .slice()
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 6);

  return (
    <section className="container-page py-16 sm:py-24">
      <FadeIn>
        <SectionTitle
          eyebrow="Popular Destinations"
          title="Cambodia's Most Loved Places"
          description="Handpicked highlights across eco-tourism, cultural heritage, and dark tourism sites."
        />
      </FadeIn>

      <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {popular.map((destination, index) => (
          <StaggerItem key={destination.id}>
            <DestinationCard destination={destination} priority={index < 3} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn delay={0.15} className="mt-10 flex justify-center">
        <Button href="/destinations" variant="outline">
          View All Destinations
        </Button>
      </FadeIn>
    </section>
  );
}
