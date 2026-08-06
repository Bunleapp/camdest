import { fetchDestinations } from "@/services/destinationService";
import DestinationImage from "@/components/ui/DestinationImage";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/motion/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/ui/motion/StaggerContainer";

export default async function GalleryPreview() {
  const destinations = await fetchDestinations();
  const highlights = destinations.slice(0, 8);

  return (
    <section className="container-page py-16 sm:py-24">
      <FadeIn>
        <SectionTitle
          eyebrow="Gallery"
          title="A Glimpse of Cambodia"
          description="Temples at dawn, tropical islands, and quiet sites of remembrance."
        />
      </FadeIn>

      <StaggerContainer className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {highlights.map((destination, index) => (
          <StaggerItem
            key={destination.id}
            className={
              index === 0 ? "col-span-2 row-span-2 h-64 sm:h-full" : "h-32 sm:h-40"
            }
          >
            <div className="relative h-full w-full overflow-hidden rounded-xl">
              <DestinationImage src={destination.images[0]} alt={destination.name} />
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn delay={0.15} className="mt-10 flex justify-center">
        <Button href="/gallery" variant="outline">
          Open Full Gallery
        </Button>
      </FadeIn>
    </section>
  );
}
