"use client";

import type { Destination } from "@/types/destination";
import { updateDestinationRequest } from "@/services/destinationService";
import DestinationForm from "@/components/admin/DestinationForm";

interface EditDestinationClientProps {
  destination: Destination;
}

export default function EditDestinationClient({
  destination,
}: EditDestinationClientProps) {
  async function handleUpdate(input: Omit<Destination, "id">) {
    await updateDestinationRequest(destination.id, input);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Edit Destination
        </h1>
        <p className="mt-1 text-sm text-slate-500">{destination.name}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <DestinationForm
          mode="edit"
          initialDestination={destination}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
}
