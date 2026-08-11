import { z } from "zod";

export const coordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const reviewSchema = z.object({
  id: z.string(),
  author: z.string().min(1),
  rating: z.number().min(0).max(5),
  comment: z.string().min(1),
  date: z.string(),
});

export const tourismCategorySchema = z.enum([
  "eco-tourism",
  "cultural-heritage",
  "dark-tourism",
]);

export const destinationInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  province: z.string().min(1, "Province is required"),
  category: tourismCategorySchema,
  price: z.number().nonnegative(),
  rating: z.number().min(0).max(5),
  description: z.string().min(1, "Description is required"),
  activities: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  coordinates: coordinatesSchema,
  openingHours: z.string().min(1),
  reviews: z.array(reviewSchema).default([]),
  nearbyAttractions: z.array(z.string()).default([]),
  familyFriendly: z.boolean().default(false),
  popularity: z.number().min(0).max(100).default(0),
});

export const destinationUpdateSchema = destinationInputSchema.partial();

export const estimateRequestSchema = z.object({
  destinationId: z.string().min(1),
  transportation: z.enum(["car", "bus", "train", "flight"]),
  accommodation: z.enum(["budget", "standard", "luxury"]),
  foodBudget: z.enum(["low", "medium", "high"]),
  travelDays: z.number().int().min(1).max(60),
  travelers: z.number().int().min(1).max(50),
  activities: z.array(z.string()).default([]),
});

export const recommendationQuerySchema = z.object({
  budget: z.coerce.number().optional(),
  activities: z.string().optional(),
  province: z.string().optional(),
  travelDuration: z.coerce.number().optional(),
  travelerType: z
    .enum(["family", "couple", "solo", "adventure", "beach", "culture"])
    .optional(),
  category: tourismCategorySchema.optional(),
});

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-()\s]+$/, "Phone number contains invalid characters"),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const adminLoginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

/**
 * Admin destination form schema.
 *
 * Reuses the same field-level rules as `destinationInputSchema`
 * (category enum, rating 0-5, nonnegative price, coordinates, etc.)
 * but accepts array fields (activities, images, nearbyAttractions) as
 * newline-separated text since the admin form uses plain textareas for
 * these instead of a dynamic list-editor UI. The values are split into
 * arrays before being sent to the existing POST/PUT APIs, which still
 * validate the final array shape via destinationInputSchema /
 * destinationUpdateSchema server-side — this form schema does not
 * weaken that validation, it only adapts the input format.
 */
export const destinationFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  province: z.string().min(1, "Province is required"),
  category: tourismCategorySchema,
  price: z.coerce.number().nonnegative("Price must be 0 or greater"),
  rating: z.coerce.number().min(0, "Rating must be between 0 and 5").max(5, "Rating must be between 0 and 5"),
  description: z.string().min(1, "Description is required"),
  activitiesText: z.string().optional(),
  imagesText: z.string().optional(),
  nearbyAttractionsText: z.string().optional(),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  openingHours: z.string().min(1, "Opening hours are required"),
  familyFriendly: z.boolean().default(false),
  popularity: z.coerce.number().min(0).max(100).default(0),
});

export type DestinationFormInput = z.infer<typeof destinationFormSchema>;
