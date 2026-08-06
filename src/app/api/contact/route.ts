import { NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/api-response";
import { contactFormSchema } from "@/lib/validation";

/**
 * POST /api/contact
 * Validates the contact message, then forwards it to Formspree
 * (https://formspree.io) so the site owner receives it by email
 * and can view it in the Formspree dashboard. There is no real
 * backend/database in this project; Formspree acts as the mail
 * relay. Swapping this for a different provider or a real backend
 * later requires no changes to the frontend, since it already only
 * talks to this Route Handler.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues.map((i) => i.message).join(", "), 400);
    }

    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

    if (!formspreeEndpoint) {
      console.error("[contact] FORMSPREE_ENDPOINT is not configured");
      return apiError("Contact form is not configured. Please try again later.", 500);
    }

    const { name, email, phone, subject, message } = parsed.data;

    const formspreeResponse = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        subject,
        message,
        _subject: `New contact message: ${subject}`,
      }),
    });

    if (!formspreeResponse.ok) {
      console.error("[contact] Formspree submission failed:", await formspreeResponse.text());
      return apiError("Failed to submit contact form", 502);
    }

    return apiSuccess({
      success: true,
      message: "Your message has been received. We'll get back to you soon.",
    });
  } catch {
    return apiError("Failed to submit contact form", 500);
  }
}
