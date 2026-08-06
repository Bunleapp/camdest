export default function GalleryLoading() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto h-10 w-64 max-w-full animate-pulse rounded-full bg-black/5" />
      <div className="mx-auto mt-6 h-8 w-full max-w-80 animate-pulse rounded-full bg-black/5" />
      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`w-full animate-pulse rounded-xl bg-black/5 ${
              i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
