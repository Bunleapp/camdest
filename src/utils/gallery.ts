import { Destination, TourismCategory } from "@/types/destination";

export interface GalleryImage {
  id: string;
  destinationId: string;
  destinationName: string;
  province: string;
  category: TourismCategory;
  src: string;
  index: number;
}

/** Flattens every data-provided destination image into a gallery entry. */
export function buildGalleryImages(destinations: Destination[]): GalleryImage[] {
  return destinations.flatMap((destination) =>
    destination.images.map((src, index) => ({
      id: `${destination.id}-${index}`,
      destinationId: destination.id,
      destinationName: destination.name,
      province: destination.province,
      category: destination.category,
      src,
      index,
    }))
  );
}
