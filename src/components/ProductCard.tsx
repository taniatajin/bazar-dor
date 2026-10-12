import Link from "next/link";
import type { Product } from "@/types";
import { UNIT_LABEL, toBn } from "@/lib/format";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      prefetch={false}
      className="block rounded-xl border border-line bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gray-100 text-2xl">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{product.nameBn}</h3>
          <p className="text-xs text-muted">
            {UNIT_LABEL[product.unit] ?? product.unit}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="text-xl font-bold">
            {toBn(product.today)}{" "}
            <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}