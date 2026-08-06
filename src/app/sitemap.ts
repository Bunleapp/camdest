import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { fetchDestinations } from "@/services/destinationService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/destinations`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/estimate`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    const destinations = await fetchDestinations();
    const destinationRoutes: MetadataRoute.Sitemap = destinations.map((destination) => ({
      url: `${SITE_URL}/destinations/${destination.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticRoutes, ...destinationRoutes];
  } catch {
    // If the API is unreachable at build time, fall back to static
    // routes only rather than failing sitemap generation entirely.
    return staticRoutes;
  }
}
