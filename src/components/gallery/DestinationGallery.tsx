import DestinationImage from "@/components/ui/DestinationImage";

interface DestinationGalleryProps {
  images: string[];
  name: string;
}

/** Renders every data-provided local image for a destination detail page. */
export default function DestinationGallery({
  images,
  name,
}: DestinationGalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {images.map((src, index) => (
        <div key={src} className="relative h-28 overflow-hidden rounded-xl sm:h-36">
          <DestinationImage src={src} alt={`${name} photo ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}
