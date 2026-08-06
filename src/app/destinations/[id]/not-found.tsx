import Link from "next/link";
import Button from "@/components/ui/Button";

export default function DestinationNotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <h2 className="text-2xl font-bold text-foreground">
        Destination Not Found
      </h2>
      <p className="mt-2 max-w-md text-muted">
        The destination you&apos;re looking for doesn&apos;t exist or may have
        been removed.
      </p>
      <div className="mt-6 flex gap-3">
        <Button href="/destinations">Browse Destinations</Button>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-foreground hover:text-primary-dark"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
