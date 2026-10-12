export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="skeleton h-11 w-11 shrink-0 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-2">
          <div className="skeleton h-3 w-14" />
          <div className="skeleton h-6 w-20" />
        </div>
        <div className="skeleton h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="লোড হচ্ছে…"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      {[0, 1, 2].map((i) => (
        <section key={i}>
          <div className="skeleton mb-4 h-6 w-40" />
          <ProductGridSkeleton count={i === 2 ? 9 : 6} />
        </section>
      ))}
    </div>
  );
}