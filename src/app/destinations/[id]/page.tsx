import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationImage from "@/components/ui/DestinationImage";
import RatingStars from "@/components/ui/RatingStars";
import ActivityList from "@/components/ui/ActivityList";
import MapPlaceholder from "@/components/ui/MapPlaceholder";
import WeatherPlaceholder from "@/components/ui/WeatherPlaceholder";
import ReviewList from "@/components/ui/ReviewList";
import NearbyAttractions from "@/components/ui/NearbyAttractions";
import DestinationGallery from "@/components/gallery/DestinationGallery";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { fetchDestinationById } from "@/services/destinationService";
import {
  CATEGORY_BADGE_CLASS,
  CATEGORY_LABEL,
  formatPrice,
} from "@/utils/destination-display";

interface DestinationDetailPageProps {
  params: Promise<{ id: string }>;
}

// Destinations are created/updated/deleted at runtime through the
// CRUD API, so detail pages are rendered dynamically on demand
// rather than statically generated at build time.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: DestinationDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const destination = await fetchDestinationById(id);
    return {
      title: destination.name,
      description: destination.description,
      alternates: {
        canonical: `/destinations/${id}`,
      },
      openGraph: {
        title: destination.name,
        description: destination.description,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: destination.name,
        description: destination.description,
      },
    };
  } catch {
    return { title: "Destination Not Found" };
  }
}

export default async function DestinationDetailPage({
  params,
}: DestinationDetailPageProps) {
  const { id } = await params;

  const destination = await fetchDestinationById(id).catch(() => null);

  if (!destination) {
    notFound();
  }

  return (
    <div className="container-page py-12">
      <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
        <DestinationImage
          src={destination.images[0]}
          alt={destination.name}
          priority
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${CATEGORY_BADGE_CLASS[destination.category]}`}
        >
          {CATEGORY_LABEL[destination.category]}
        </span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                {destination.name}
              </h1>
              <p className="mt-1 text-muted">{destination.province}, Cambodia</p>
            </div>
            <RatingStars rating={destination.rating} />
          </div>

          <p className="mt-6 text-base leading-relaxed text-muted">
            {destination.description}
          </p>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-foreground">Activities</h2>
            <div className="mt-3">
              <ActivityList activities={destination.activities} />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-foreground">Gallery</h2>
            <div className="mt-3">
              <DestinationGallery
                images={destination.images}
                name={destination.name}
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Location</h2>
              <div className="mt-3">
                <MapPlaceholder
                  coordinates={destination.coordinates}
                  name={destination.name}
                />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Weather</h2>
              <div className="mt-3">
                <WeatherPlaceholder province={destination.province} />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-foreground">
              Reviews ({destination.reviews.length})
            </h2>
            <div className="mt-3">
              <ReviewList reviews={destination.reviews} />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-foreground">
              Nearby Attractions
            </h2>
            <div className="mt-3">
              <NearbyAttractions attractions={destination.nearbyAttractions} />
            </div>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5">
            <p className="text-sm text-muted">Entrance Fee</p>
            <p className="mt-1 text-3xl font-bold text-primary-dark">
              {formatPrice(destination.price)}
            </p>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Opening Hours</dt>
                <dd className="font-medium text-foreground">
                  {destination.openingHours}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Family Friendly</dt>
                <dd className="font-medium text-foreground">
                  {destination.familyFriendly ? "Yes" : "No"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Popularity</dt>
                <dd className="font-medium text-foreground">
                  {destination.popularity}/100
                </dd>
              </div>
            </dl>

            <Button href="/estimate" className="mt-6 w-full">
              Estimate Trip Cost
            </Button>
          </div>
        </aside>
      </div>

      <div className="mt-16">
        <SectionTitle
          align="left"
          eyebrow="Keep Exploring"
          title="More Destinations"
        />
        <div className="mt-6">
          <Button href="/destinations" variant="outline">
            Back to All Destinations
          </Button>
        </div>
      </div>
    </div>
  );
}
