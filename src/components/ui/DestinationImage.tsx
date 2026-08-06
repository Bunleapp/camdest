import Image from "next/image";

interface DestinationImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Renders a local public destination image with next/image. Image paths are
 * provided by the destination data layer and must begin with a leading slash.
 */
export default function DestinationImage({
  src,
  alt,
  fill = true,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  className = "",
}: DestinationImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
