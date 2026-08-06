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
