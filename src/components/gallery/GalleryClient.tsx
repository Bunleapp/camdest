"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Destination } from "@/types/destination";
import CategoryTabs, { GalleryCategoryFilter } from "@/components/gallery/CategoryTabs";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import Pagination from "@/components/ui/Pagination";
import { buildGalleryImages, GalleryImage } from "@/utils/gallery";

// The lightbox (with framer-motion) is only needed once a user
// clicks a photo, so it's code-split out of the initial gallery
// page bundle instead of being eagerly loaded with the grid.
const GalleryModal = dynamic(() => import("@/components/gallery/GalleryModal"), {
  ssr: false,
});

const IMAGES_PER_PAGE = 18;

interface GalleryClientProps {
  destinations: Destination[];
}

export default function GalleryClient({ destinations }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategoryFilter>("all");
  const [page, setPage] = useState(1);
  const [activeImageId, setActiveImageId] = useState<string | null>(null);

  const allImages = useMemo(() => buildGalleryImages(destinations), [destinations]);

  const filteredImages = useMemo(
    () =>
      activeCategory === "all"
        ? allImages
        : allImages.filter((image) => image.category === activeCategory),
    [allImages, activeCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filteredImages.length / IMAGES_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pagedImages = filteredImages.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  const activeIndex = pagedImages.findIndex((img) => img.id === activeImageId);
  const activeImage: GalleryImage | null =
    activeIndex >= 0 ? pagedImages[activeIndex] : null;

  function handleCategoryChange(category: GalleryCategoryFilter) {
    setActiveCategory(category);
    setPage(1);
  }

  function handlePageChange(nextPage: number) {
    setPage(nextPage);
    setActiveImageId(null);
  }

  function showPrev() {
    if (pagedImages.length === 0) return;
    const prevIndex = (activeIndex - 1 + pagedImages.length) % pagedImages.length;
    setActiveImageId(pagedImages[prevIndex].id);
  }

  function showNext() {
    if (pagedImages.length === 0) return;
    const nextIndex = (activeIndex + 1) % pagedImages.length;
    setActiveImageId(pagedImages[nextIndex].id);
  }

  return (
    <div>
      <CategoryTabs active={activeCategory} onChange={handleCategoryChange} />

      {pagedImages.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <p className="text-lg font-medium text-foreground">No photos in this category yet</p>
          <p className="mt-1 text-sm text-muted">Try selecting a different category.</p>
        </div>
      ) : (
        <div className="mt-10">
          <GalleryGrid images={pagedImages} onImageClick={(img) => setActiveImageId(img.id)} />
        </div>
      )}

      <div className="mt-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <GalleryModal
        image={activeImage}
        onClose={() => setActiveImageId(null)}
        onPrev={showPrev}
        onNext={showNext}
      />
    </div>
  );
}
