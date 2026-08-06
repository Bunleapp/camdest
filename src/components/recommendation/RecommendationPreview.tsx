import { fetchRecommendations } from "@/services/destinationService";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import RecommendationCard from "@/components/recommendation/RecommendationCard";
import FadeIn from "@/components/ui/motion/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/ui/motion/StaggerContainer";

export default async function RecommendationPreview() {
  const recommendations = await fetchRecommendations({
    travelerType: "culture",
    budget: 40,
  });

  const preview = recommendations.slice(0, 3);

  if (preview.length === 0) return null;

  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="container-page">
        <FadeIn>
          <SectionTitle
            eyebrow="Recommended For You"
            title="Not Sure Where to Start?"
            description="Get personalized destination suggestions based on your budget, travel style, and interests."
          />
        </FadeIn>

        <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((rec) => (
            <StaggerItem key={rec.destination.id}>
              <RecommendationCard recommendation={rec} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.15} className="mt-10 flex justify-center">
          <Button href="/destinations">Get Full Recommendations</Button>
        </FadeIn>
      </div>
    </section>
  );
}
