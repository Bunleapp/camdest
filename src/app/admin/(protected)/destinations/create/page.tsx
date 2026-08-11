"use client";

import type { Destination } from "@/types/destination";
import { createDestinationRequest } from "@/services/destinationService";
import DestinationForm from "@/components/admin/DestinationForm";

/**
 * /admin/destinations/create
 *
 * The POST request goes to the same /api/destinations endpoint the
 * rest of the app uses. Server-side authorization (requireAdmin) in
 * that route handler is what actually prevents unauthorized creation —
 * this page being reachable only requires a valid session because of
 * src/middleware.ts, but the API check is independent and would still
 * reject a request from an expired/invalid session.
 */
export default function CreateDestinationPage() {
  async function handleCreate(input: Omit<Destination, "id">) {
    await createDestinationRequest(input);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Create Destination
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Add a new destination to the public tourism website.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <DestinationForm mode="create" onSubmit={handleCreate} />
      </div>
    </div>
  );
}
