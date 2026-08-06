import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import GalleryClient from "@/components/gallery/GalleryClient";
import { fetchDestinations } from "@/services/destinationService";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos from Cambodia's eco-tourism, cultural & heritage, and dark tourism destinations.",
  alternates: {
    canonical: "/gallery",
  },
};

export default async function GalleryPage() {
  const destinations = await fetchDestinations();

  return (
    <div className="container-page py-16">
      <SectionTitle
        eyebrow="Gallery"
        title="A Glimpse of Cambodia"
        description="Temples at dawn, tropical islands, and quiet sites of remembrance — filter by category and explore in detail."
      />

      <div className="mt-8">
        <GalleryClient destinations={destinations} />
      </div>
    </div>
  );
}
