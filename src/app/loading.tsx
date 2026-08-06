
export default function HomeLoading() {
  return (
    <div className="container-page py-24">
      <div className="mx-auto h-10 w-64 animate-pulse rounded-full bg-black/5" />
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-72 animate-pulse rounded-2xl bg-black/5" />
        ))}
      </div>
    </div>
  );
}

