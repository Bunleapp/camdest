import { notFound } from "next/navigation";
import { fetchDestinationById } from "@/services/destinationService";
import EditDestinationClient from "@/components/admin/EditDestinationClient";

interface EditDestinationPageProps {
  params: Promise<{ id: string }>;
}

/**
 * /admin/destinations/[id]/edit
 *
 * Server Component: fetches the destination via the same public
 * GET /api/destinations/[id] endpoint. If the ID doesn't exist, this
 * renders the standard Next.js not-found UI instead of crashing —
 * matches Test 8 (invalid destination ID must be handled safely).
 */
export default async function EditDestinationPage({
  params,
}: EditDestinationPageProps) {
  const { id } = await params;

  let destination;
  try {
    destination = await fetchDestinationById(id);
  } catch {
    notFound();
  }

  if (!destination) {
    notFound();
  }

  return <EditDestinationClient destination={destination} />;
}
