"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function HomeError({
  error,
  reset, // build in function
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <h2 className="text-2xl font-bold text-foreground">
        Something went wrong
      </h2>
      <p className="mt-2 max-w-md text-muted">
        We couldn&apos;t load the homepage content. Please try again.
      </p>
      <Button onClick={reset} className="mt-6">
        Try Again
      </Button>
    </div>
  );
}

// "use client": error.tsx must be client components because it can
// happen in user's browser (runtime errors) and needs to use
// React hook to handle user click to recover

// useEffect: hook listens for that error and logs it to the browser's console
// this help figure out what went wrong

// build-in reset function, when user click Try Again button,
// reset () will tells Next.js to attempt to re-render the broken page.tsx