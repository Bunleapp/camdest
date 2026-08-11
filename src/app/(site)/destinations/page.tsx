import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import DestinationsExplorer from "@/components/search/DestinationsExplorer";
import RecommendationForm from "@/components/recommendation/RecommendationForm";
import { FilterProvider } from "@/context/FilterContext";
import { fetchDestinations, searchDestinationsRequest } from "@/services/destinationService";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Browse eco-tourism, cultural & heritage, and dark tourism destinations across Cambodia.",
  // Canonicalizes to the clean listing URL regardless of the ?q=
  // search param, so search-result variations of this page aren't
  // treated as separate, competing pages by search engines.
  // (treated the search quesry as belonging tot he main /destinations page)
  alternates: {
    canonical: "/destinations",
  },
};

interface DestinationsPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function DestinationsPage({
  searchParams,
}: DestinationsPageProps) {

  const { q } = await searchParams;


  const initialDestinations = q

    // if q exist (user search for sth), it 
    // asks database to run specific text search
    ? await searchDestinationsRequest({ q })

    // if q is blank it simple ask database 
    // for the complete list of all destination 
    : await fetchDestinations();

  /*<FilterProvider> this is a core of the page that allows frontend
  to have a snappy, interactive filtering experience
  without needing to hit the database again */

  return (
    <div className="container-page py-16">
      <SectionTitle
        eyebrow="Explore Cambodia"
        title="All Destinations"
        description="Eco-tourism escapes, cultural & heritage landmarks, and dark tourism sites of remembrance."
      />



      <div className="mt-8">
        <FilterProvider>
          <DestinationsExplorer
            initialDestinations={initialDestinations}
            initialQuery={q ?? ""}
          />
        </FilterProvider>
      </div>

      <div className="mt-20 rounded-2xl bg-surface p-6 sm:p-10">
        <SectionTitle
          align="left"
          eyebrow="Personalized"
          title="Get Recommendations"
          description="Tell us your budget, travel style, and duration — we'll suggest the best matches."
        />
        <div className="mt-8">
          <RecommendationForm />
        </div>
      </div>
    </div>
  );
}
