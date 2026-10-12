import { ProductGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-8">
      <div className="skeleton h-24 w-full rounded-2xl" />
      <div className="skeleton h-16 w-full rounded-2xl" />
      <ProductGridSkeleton count={6} />
    </div>
  );
}