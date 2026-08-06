export default function DestinationDetailLoading() {
  return (
    <div className="container-page py-16">
      <div className="h-72 w-full animate-pulse rounded-3xl bg-black/5 sm:h-96" />
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-8 w-2/3 animate-pulse rounded-full bg-black/5" />
          <div className="h-4 w-1/3 animate-pulse rounded-full bg-black/5" />
          <div className="h-24 w-full animate-pulse rounded-2xl bg-black/5" />
        </div>
        <div className="h-64 animate-pulse rounded-2xl bg-black/5" />
      </div>
    </div>
  );
}
