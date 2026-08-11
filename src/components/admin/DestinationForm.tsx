"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  destinationFormSchema,
  type DestinationFormInput,
} from "@/lib/validation";
import { Destination } from "@/types/destination";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

interface DestinationFormProps {
  mode: "create" | "edit";
  initialDestination?: Destination;
  onSubmit: (input: Omit<Destination, "id">) => Promise<void>;
}

const CATEGORY_OPTIONS = [
  { value: "eco-tourism", label: "Eco Tourism" },
  { value: "cultural-heritage", label: "Cultural & Heritage" },
  { value: "dark-tourism", label: "Dark Tourism" },
] as const;

function linesToArray(text: string | undefined): string[] {
  if (!text) return [];
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function arrayToLines(items: string[] | undefined): string {
  return (items ?? []).join("\n");
}

type SubmitState = "idle" | "submitting" | "error";

/**
 * Shared create/edit form for destinations. Used by both
 * /admin/destinations/create and /admin/destinations/[id]/edit so the
 * validation rules, layout, and submit handling aren't duplicated.
 *
 * Existing `reviews` are preserved as-is on edit (not user-editable
 * here) — this form manages the core destination fields the task asks
 * for; a full nested review editor is out of scope.
 */
export default function DestinationForm({
  mode,
  initialDestination,
  onSubmit,
}: DestinationFormProps) {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DestinationFormInput>({
    resolver: zodResolver(destinationFormSchema),
    defaultValues: initialDestination
      ? {
          name: initialDestination.name,
          province: initialDestination.province,
          category: initialDestination.category,
          price: initialDestination.price,
          rating: initialDestination.rating,
          description: initialDestination.description,
          activitiesText: arrayToLines(initialDestination.activities),
          imagesText: arrayToLines(initialDestination.images),
          nearbyAttractionsText: arrayToLines(
            initialDestination.nearbyAttractions
          ),
          latitude: initialDestination.coordinates.lat,
          longitude: initialDestination.coordinates.lng,
          openingHours: initialDestination.openingHours,
          familyFriendly: initialDestination.familyFriendly,
          popularity: initialDestination.popularity,
        }
      : {
          category: "eco-tourism",
          familyFriendly: false,
          popularity: 0,
        },
  });

  async function handleFormSubmit(data: DestinationFormInput) {
    setSubmitState("submitting");
    setErrorMessage(null);

    const payload: Omit<Destination, "id"> = {
      name: data.name,
      province: data.province,
      category: data.category,
      price: data.price,
      rating: data.rating,
      description: data.description,
      activities: linesToArray(data.activitiesText),
      images: linesToArray(data.imagesText),
      coordinates: { lat: data.latitude, lng: data.longitude },
      openingHours: data.openingHours,
      reviews: initialDestination?.reviews ?? [],
      nearbyAttractions: linesToArray(data.nearbyAttractionsText),
      familyFriendly: data.familyFriendly,
      popularity: data.popularity,
    };

    try {
      await onSubmit(payload);
      router.push("/admin/destinations");
      router.refresh();
    } catch (err) {
      setSubmitState("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : mode === "create"
            ? "Unable to create destination. Please try again."
            : "Unable to update destination. Please try again."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
      noValidate
      aria-busy={submitState === "submitting"}
    >
      <p className="text-xs text-slate-500">
        Fields marked <span aria-hidden="true" className="text-red-500">*</span> are required.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Name"
          required
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Province"
          required
          error={errors.province?.message}
          {...register("province")}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="w-full">
          <label htmlFor="category" className="block text-sm font-medium text-foreground">
            Category<span aria-hidden="true" className="ml-0.5 text-red-500">*</span>
          </label>
          <select
            id="category"
            {...register("category")}
            className="mt-1.5 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.category?.message && (
            <p role="alert" className="mt-1.5 text-xs text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        <Input
          label="Price (USD)"
          type="number"
          step="0.01"
          min="0"
          required
          error={errors.price?.message}
          {...register("price")}
        />
        <Input
          label="Rating (0-5)"
          type="number"
          step="0.1"
          min="0"
          max="5"
          required
          error={errors.rating?.message}
          {...register("rating")}
        />
      </div>

      <Textarea
        label="Description"
        rows={4}
        required
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Latitude"
          type="number"
          step="0.0001"
          min="-90"
          max="90"
          required
          error={errors.latitude?.message}
          {...register("latitude")}
        />
        <Input
          label="Longitude"
          type="number"
          step="0.0001"
          min="-180"
          max="180"
          required
          error={errors.longitude?.message}
          {...register("longitude")}
        />
      </div>

      <Input
        label="Opening Hours"
        placeholder="e.g. 05:00 - 17:30"
        required
        error={errors.openingHours?.message}
        {...register("openingHours")}
      />

      <Textarea
        label="Activities (one per line)"
        rows={4}
        placeholder={"Sunrise Viewing\nTemple Exploration"}
        error={errors.activitiesText?.message}
        {...register("activitiesText")}
      />

      <Textarea
        label="Image paths (one per line)"
        rows={4}
        placeholder="/CulturalTourism/AngkorWat/cover.jpeg"
        error={errors.imagesText?.message}
        {...register("imagesText")}
      />
      <p className="text-xs text-slate-500">
        Use existing local image paths under <code>public/</code> (e.g. the
        same convention as other destinations). Do not enter external URLs
        unless required.
      </p>

      <Textarea
        label="Nearby attractions (one per line)"
        rows={3}
        error={errors.nearbyAttractionsText?.message}
        {...register("nearbyAttractionsText")}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Popularity (0-100)"
          type="number"
          min="0"
          max="100"
          error={errors.popularity?.message}
          {...register("popularity")}
        />
        <div className="flex items-center gap-2 pt-7">
          <input
            id="familyFriendly"
            type="checkbox"
            {...register("familyFriendly")}
            className="h-4 w-4 rounded border-black/20 text-primary focus:ring-primary/40"
          />
          <label htmlFor="familyFriendly" className="text-sm font-medium text-foreground">
            Family friendly
          </label>
        </div>
      </div>

      {submitState === "error" && errorMessage && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={submitState === "submitting"}>
          {submitState === "submitting"
            ? mode === "create"
              ? "Creating..."
              : "Saving..."
            : mode === "create"
              ? "Create Destination"
              : "Save Changes"}
        </Button>
        <button
          type="button"
          onClick={() => router.push("/admin/destinations")}
          className="rounded-full px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
