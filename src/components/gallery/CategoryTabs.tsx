import { TourismCategory } from "@/types/destination";
import { CATEGORY_LABEL } from "@/utils/destination-display";

export type GalleryCategoryFilter = "all" | TourismCategory;

interface CategoryTabsProps {
  active: GalleryCategoryFilter;
  onChange: (category: GalleryCategoryFilter) => void;
}

const TABS: { id: GalleryCategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "eco-tourism", label: CATEGORY_LABEL["eco-tourism"] },
  { id: "cultural-heritage", label: CATEGORY_LABEL["cultural-heritage"] },
  { id: "dark-tourism", label: CATEGORY_LABEL["dark-tourism"] },
];

/**
 * Plain toggle-button group (not a WAI-ARIA tablist) for filtering
 * the gallery by category. A tablist implies roving-tabindex and
 * arrow-key navigation semantics; since these buttons are reached
 * via standard Tab order and don't switch tabpanels, aria-pressed
 * on a button group is the correct, honest ARIA pattern here.
 */
export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div
      role="group"
      aria-label="Filter gallery by category"
      className="flex flex-wrap justify-center gap-2"
    >
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(tab.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary-dark text-white shadow-sm"
                : "bg-black/5 text-foreground hover:bg-black/10"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
