"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2, Search } from "lucide-react";
import { Destination } from "@/types/destination";
import { deleteDestinationRequest } from "@/services/destinationService";
import ConfirmDialog from "./ConfirmDialog";

interface DestinationsTableProps {
  initialDestinations: Destination[];
}

type DeleteState =
  | { status: "idle" }
  | { status: "confirming"; destination: Destination }
  | { status: "deleting"; destination: Destination }
  | { status: "error"; destination: Destination; message: string };

/**
 * Client-side destination management table: search/filter, and
 * View/Edit/Delete actions. The delete action always shows a
 * confirmation dialog first, then calls the real DELETE API — the
 * dialog is a UX safeguard, not the security boundary (see
 * requireAdmin() in the API route handler for the actual enforcement).
 */
export default function DestinationsTable({
  initialDestinations,
}: DestinationsTableProps) {
  const router = useRouter();
  const [destinations, setDestinations] = useState(initialDestinations);
  const [query, setQuery] = useState("");
  const [deleteState, setDeleteState] = useState<DeleteState>({ status: "idle" });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return destinations;
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.province.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
    );
  }, [destinations, query]);

  function requestDelete(destination: Destination) {
    setSuccessMessage(null);
    setDeleteState({ status: "confirming", destination });
  }

  async function confirmDelete() {
    if (deleteState.status !== "confirming") return;
    const { destination } = deleteState;
    setDeleteState({ status: "deleting", destination });

    try {
      await deleteDestinationRequest(destination.id);
      setDestinations((prev) => prev.filter((d) => d.id !== destination.id));
      setDeleteState({ status: "idle" });
      setSuccessMessage(`"${destination.name}" was deleted successfully.`);
      router.refresh();
    } catch (err) {
      setDeleteState({
        status: "error",
        destination,
        message:
          err instanceof Error
            ? err.message
            : "Unable to delete destination. Please try again.",
      });
    }
  }

  function cancelDelete() {
    setDeleteState({ status: "idle" });
  }

  const isDialogOpen =
    deleteState.status === "confirming" || deleteState.status === "deleting";

  return (
    <div className="space-y-4">
      {successMessage && (
        <p role="status" className="rounded-xl bg-teal-50 px-4 py-3 text-sm text-teal-800">
          {successMessage}
        </p>
      )}

      {deleteState.status === "error" && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {deleteState.message}
        </p>
      )}

      <div className="relative max-w-sm">
        <Search
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <label htmlFor="destination-search" className="sr-only">
          Search destinations
        </label>
        <input
          id="destination-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, province, category..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Name</th>
              <th scope="col" className="px-4 py-3 font-medium">Province</th>
              <th scope="col" className="px-4 py-3 font-medium">Category</th>
              <th scope="col" className="px-4 py-3 font-medium">Price</th>
              <th scope="col" className="px-4 py-3 font-medium">Rating</th>
              <th scope="col" className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                  {destinations.length === 0
                    ? "No destinations yet. Create your first one to get started."
                    : "No destinations match your search."}
                </td>
              </tr>
            ) : (
              filtered.map((destination) => (
                <tr key={destination.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {destination.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{destination.province}</td>
                  <td className="px-4 py-3 text-slate-600">{destination.category}</td>
                  <td className="px-4 py-3 text-slate-600">${destination.price}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {destination.rating.toFixed(1)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/destinations/${destination.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${destination.name} on the public site`}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Eye size={16} aria-hidden="true" />
                      </Link>
                      <Link
                        href={`/admin/destinations/${destination.id}/edit`}
                        aria-label={`Edit ${destination.name}`}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Pencil size={16} aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => requestDelete(destination)}
                        aria-label={`Delete ${destination.name}`}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Delete destination?"
        description={
          deleteState.status !== "idle"
            ? `Are you sure you want to delete "${deleteState.destination.name}"? This action cannot be undone.`
            : ""
        }
        isConfirming={deleteState.status === "deleting"}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
