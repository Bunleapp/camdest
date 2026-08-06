import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import FeaturedDestinations from "@/components/cards/FeaturedDestinations";
import RecommendationPreview from "@/components/recommendation/RecommendationPreview";
import GalleryPreview from "@/components/gallery/GalleryPreview";
import CostEstimationPreview from "@/components/cards/CostEstimationPreview";
import CTASection from "@/components/cards/CTASection";
import Testimonials from "@/components/ui/Testimonials";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

// metadata object, that nextjs takes this info and inject it into <head> of HTML document
export const metadata: Metadata = {
  title: `${SITE_NAME} | Explore the World`,
  description: SITE_DESCRIPTION,
  alternates: {
    //tells search engines that is the master or primary version of home page url
    canonical: "/",
  },
};

// when users scroll down the page will see Hero -> Destination -> Recommendation -> so-on
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedDestinations />
      <RecommendationPreview />
      <GalleryPreview />
      <CostEstimationPreview />
      <Testimonials />
      <CTASection />
    </>
  );
}
