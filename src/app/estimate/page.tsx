import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";
import CostEstimatorForm from "@/components/forms/CostEstimatorForm";
import { fetchDestinations } from "@/services/destinationService";

export const metadata: Metadata = {
  title: "Cost Estimation",
  description:
    "Estimate your Cambodia trip cost — accommodation, transportation, food, and activities.",
  alternates: {
    canonical: "/estimate",
  },
};

export default async function EstimatePage() {
  const destinations = await fetchDestinations();

  return (
    <div className="container-page py-16">
      <SectionTitle
        eyebrow="Plan Your Budget"
        title="Cost Estimation"
        description="Select your destination and preferences to get an instant cost breakdown for your Cambodia trip."
      />

      <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
        <CostEstimatorForm destinations={destinations} />
      </div>
    </div>
  );
}
