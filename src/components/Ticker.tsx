import { getProducts } from "@/lib/api";
import { UNIT_SHORT, toBn } from "@/lib/format";
import ChangeBadge from "./ChangeBadge";

export default async function Ticker() {
  const products = await getProducts();
  if (products.length === 0) return null;

  // দুইবার দেওয়া হয়েছে যাতে লুপটা মাঝখানে না থামে
  const items = [...products, ...products];

  return (
    <div className="marquee overflow-hidden border-t border-line bg-white py-2 text-sm">
      <div className="marquee-track">
        {items.map((p, i) => (
          <span
            key={`${p.id}-${i}`}
            aria-hidden={i >= products.length}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap px-5"
          >
            <span>{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span className="text-muted">
              {toBn(p.today)} টাকা/{UNIT_SHORT[p.unit] ?? p.unit}
            </span>
            <ChangeBadge change={p.change} plain />
          </span>
        ))}
      </div>
    </div>
  );
}