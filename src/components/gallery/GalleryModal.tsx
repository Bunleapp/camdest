"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DestinationImage from "@/components/ui/DestinationImage";
import { GalleryImage } from "@/utils/gallery";
import { CATEGORY_LABEL } from "@/utils/destination-display";

interface GalleryModalProps {
  image: GalleryImage | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function GalleryModal({
  image,
  onClose,
  onPrev,
  onNext,
}: GalleryModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!image) return;

    // Remember what had focus before opening so it can be restored
    // on close, and move focus into the dialog immediately.
    triggerElementRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    function getFocusableElements(): HTMLElement[] {
      if (!dialogRef.current) return [];
      return Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        onPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        onNext();
        return;
      }

      if (event.key === "Tab") {
        const focusable = getFocusableElements();
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (triggerElementRef.current instanceof HTMLElement) {
        triggerElementRef.current.focus();
      }
    };
  }, [image, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${image.destinationName} photo preview`}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <DestinationImage
                src={image.src}
                alt={`${image.destinationName} photo ${image.index + 1}`}
                priority
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-white">
              <div>
                <p className="font-semibold">{image.destinationName}</p>
                <p className="text-sm text-slate-300">
                  {image.province} · {CATEGORY_LABEL[image.category]}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous photo"
                  className="rounded-full bg-white/10 p-2.5 hover:bg-white/20"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M12.5 15L7.5 10l5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next photo"
                  className="rounded-full bg-white/10 p-2.5 hover:bg-white/20"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close preview"
                  className="rounded-full bg-white/10 p-2.5 hover:bg-white/20"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
