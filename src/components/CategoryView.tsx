"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Category, Product } from "@/types";
import { toBn } from "@/lib/format";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

type SortKey = "default" | "low" | "high";

export default function CategoryView({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  const [sort, setSort] = useState<SortKey>("default");

  
  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "low") list.sort((a, b) => a.today - b.today);
    if (sort === "high") list.sort((a, b) => b.today - a.today);
    return list;
  }, [products, sort]);

  if (products.length === 0) {
    return (
      <EmptyState
        title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
        message="অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।"
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-8">
      <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-gray-100 text-3xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-muted">
            প্রতিটি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 rounded-2xl border border-line bg-white p-4 shadow-sm">
        <label htmlFor="sort" className="text-sm text-muted">
          সাজান:
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="appearance-none rounded-lg border border-line bg-gray-50 py-2 pl-3 pr-9 text-sm outline-none focus:border-brand"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
          />
        </div>
      </div>

      <p className="text-sm text-muted">
        মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}