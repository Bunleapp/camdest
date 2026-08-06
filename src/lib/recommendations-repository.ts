import { promises as fs } from "fs";
import path from "path";
import { Destination, Recommendation, RecommendationCriteria } from "@/types/destination";
import { getAllDestinations } from "@/lib/destinations-repository";

interface RecommendationRule {
  destinationId: string;
  tags: string[];
  budgetTier: "low" | "medium" | "high";
  reasons: string[];
}

const DATA_DIR = path.join(process.cwd(), "src", "data");
const RECOMMENDATIONS_FILE = path.join(DATA_DIR, "recommendations.json");

async function readRules(): Promise<RecommendationRule[]> {
  const raw = await fs.readFile(RECOMMENDATIONS_FILE, "utf-8");
  return JSON.parse(raw) as RecommendationRule[];
}

function budgetTierFromAmount(budget: number): "low" | "medium" | "high" {
  if (budget <= 30) return "low";
  if (budget <= 60) return "medium";
  return "high";
}

export async function getRecommendations(
  criteria: Partial<RecommendationCriteria>
): Promise<Recommendation[]> {
  const [rules, destinations] = await Promise.all([
    readRules(),
    getAllDestinations(),
  ]);

  const destinationMap = new Map<string, Destination>(
    destinations.map((d) => [d.id, d])
  );

  const requestedTags = [
    criteria.travelerType,
    ...(criteria.activities ?? []),
  ]
    .filter((v): v is string => Boolean(v))
    .map((v) => v.toLowerCase());

  const requestedTier =
    typeof criteria.budget === "number"
      ? budgetTierFromAmount(criteria.budget)
      : undefined;

  const scored = rules
    .map((rule) => {
      const destination = destinationMap.get(rule.destinationId);
      if (!destination) return null;

      if (
        criteria.province &&
        destination.province.toLowerCase() !== criteria.province.toLowerCase()
      ) {
        return null;
      }

      if (criteria.category && destination.category !== criteria.category) {
        return null;
      }

      const tagMatches = rule.tags.filter((tag) =>
        requestedTags.includes(tag.toLowerCase())
      ).length;

      const tierMatches = requestedTier ? rule.budgetTier === requestedTier : false;

      const score =
        tagMatches * 2 +
        (tierMatches ? 2 : 0) +
        destination.rating +
        destination.popularity / 100;

      if (requestedTags.length > 0 && tagMatches === 0 && !tierMatches) {
        return null;
      }

      const estimatedBudget = Math.round(
        destination.price *
          (criteria.travelDuration && criteria.travelDuration > 0
            ? criteria.travelDuration
            : 1)
      );

      return {
        destination,
        estimatedBudget,
        reasons: rule.reasons,
        score,
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ destination, estimatedBudget, reasons }) => ({
      destination,
      estimatedBudget,
      reasons,
    }));

  if (scored.length > 0) return scored;

  // Fallback: if no rule matches, recommend top-rated destinations overall.
  return destinations
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)
    .map((destination) => ({
      destination,
      estimatedBudget: destination.price,
      reasons: ["Highly rated destination in Cambodia"],
    }));
}
