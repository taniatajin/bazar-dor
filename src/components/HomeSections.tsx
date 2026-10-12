import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";

export default async function HomeSections() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-muted">
        পণ্যের তথ্য এখন লোড করা যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।
      </p>
    );
  }

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  const grid = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <span className="text-sm text-rise">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className={grid}>
          {risers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <span className="text-sm text-fall">▼</span> আজ দাম কমেছে
        </h2>
        <div className={grid}>
          {fallers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য" className="scroll-mt-6">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="mb-4 mt-1 text-sm text-muted">
          ক্লিক করে বাজারভিত্তিক বিস্তারিত দাম দেখুন।
        </p>
        <div className={grid}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}