import { promises as fs } from "fs";
import path from "path";
import { Destination } from "@/types/destination";

/**
 * Server-only data access layer for the mock JSON "database".
 *
 * IMPORTANT: This module must only be imported from Route Handlers
 * (src/app/api/**\/route.ts). Frontend components must never read
 * these JSON files directly — they must always go through fetch()
 * calls to the API layer.
 *
 * Swapping this file's internals for a real database or REST API
 * client later requires no changes to the Route Handlers' public
 * function signatures, and therefore no changes to the frontend.
 */

const DATA_DIR = path.join(process.cwd(), "src", "data");
const DESTINATIONS_FILE = path.join(DATA_DIR, "destinations.json");

async function readDestinations(): Promise<Destination[]> {
  const raw = await fs.readFile(DESTINATIONS_FILE, "utf-8");
  return JSON.parse(raw) as Destination[];
}

async function writeDestinations(destinations: Destination[]): Promise<void> {
  await fs.writeFile(
    DESTINATIONS_FILE,
    JSON.stringify(destinations, null, 2),
    "utf-8"
  );
}

export async function getAllDestinations(): Promise<Destination[]> {
  return readDestinations();
}

export async function getDestinationById(
  id: string
): Promise<Destination | undefined> {
  const destinations = await readDestinations();
  return destinations.find((d) => d.id === id);
}

export async function createDestination(
  input: Omit<Destination, "id">
): Promise<Destination> {
  const destinations = await readDestinations();
  const nextId = `dest-${String(destinations.length + 1).padStart(3, "0")}`;
  const newDestination: Destination = { id: nextId, ...input };
  destinations.push(newDestination);
  await writeDestinations(destinations);
  return newDestination;
}

export async function updateDestination(
  id: string,
  input: Partial<Omit<Destination, "id">>
): Promise<Destination | undefined> {
  const destinations = await readDestinations();
  const index = destinations.findIndex((d) => d.id === id);
  if (index === -1) return undefined;

  const updated: Destination = { ...destinations[index], ...input, id };
  destinations[index] = updated;
  await writeDestinations(destinations);
  return updated;
}

export async function deleteDestination(id: string): Promise<boolean> {
  const destinations = await readDestinations();
  const index = destinations.findIndex((d) => d.id === id);
  if (index === -1) return false;

  destinations.splice(index, 1);
  await writeDestinations(destinations);
  return true;
}

export async function searchDestinations(query: {
  q?: string;
  province?: string;
  category?: string;
  activity?: string;
}): Promise<Destination[]> {
  const destinations = await readDestinations();
  const q = query.q?.toLowerCase().trim();

  return destinations.filter((d) => {
    const matchesQuery =
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.province.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.activities.some((a) => a.toLowerCase().includes(q));

    const matchesProvince =
      !query.province ||
      d.province.toLowerCase() === query.province.toLowerCase();

    const matchesCategory =
      !query.category ||
      d.category.toLowerCase() === query.category.toLowerCase();

    const matchesActivity =
      !query.activity ||
      d.activities.some(
        (a) => a.toLowerCase() === query.activity!.toLowerCase()
      );

    return matchesQuery && matchesProvince && matchesCategory && matchesActivity;
  });
}
