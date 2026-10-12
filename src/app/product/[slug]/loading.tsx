export default function Loading() {
  return (
    <div
      role="status"
      aria-label="লোড হচ্ছে…"
      className="mx-auto max-w-4xl space-y-6 px-4 py-8"
    >
      <div className="skeleton h-4 w-48" />
      <div className="skeleton h-36 w-full rounded-2xl" />
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="skeleton h-24 rounded-xl" />
        <div className="skeleton h-24 rounded-xl" />
        <div className="skeleton h-24 rounded-xl" />
      </div>
      <div className="skeleton h-72 w-full rounded-xl" />
    </div>
  );
}