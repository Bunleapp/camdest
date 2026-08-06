import { GalleryImage } from "@/utils/gallery";
import DestinationImage from "@/components/ui/DestinationImage";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
}

/**
 * Responsive masonry layout using CSS columns. next/image handles
 * lazy loading automatically for any image without `priority`.
 */
export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
      {images.map((image, i) => {
        const aspectClass = i % 3 === 0 ? "aspect-[3/4]" : "aspect-square";
        return (
          <button
            key={image.id}
            type="button"
            onClick={() => onImageClick(image)}
            className={`group relative block w-full overflow-hidden rounded-xl ${aspectClass}`}
            aria-label={`Open ${image.destinationName} photo ${image.index + 1}`}
          >
            <DestinationImage
              src={image.src}
              alt={`${image.destinationName} photo ${image.index + 1}`}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              {image.destinationName}
            </span>
          </button>
        );
      })}
    </div>
  );
}
