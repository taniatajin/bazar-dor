import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProducts } from "@/lib/api";
import { UNIT_LABEL, UNIT_SHORT, avgBn, toBn } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);
  return {
    title: product ? `${product.nameBn} — বাজার দর` : "পাওয়া যায়নি — বাজার দর",
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  // দ্বিতীয় স্তরের নিরাপত্তা: server এও session যাচাই
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(
      `/signin?next=${encodeURIComponent(`/product/${slug}`)}&reason=protected`
    );
  }

  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const unit = UNIT_LABEL[product.unit] ?? product.unit;
  const unitShort = UNIT_SHORT[product.unit] ?? product.unit;

  const min = Math.min(...product.markets.map((m) => m.min));
  const max = Math.max(...product.markets.map((m) => m.max));
  const avg = Math.round(
    product.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) /
      product.markets.length
  );
  const minMarket = product.markets.find((m) => m.min === min)?.market;
  const maxMarket = product.markets.find((m) => m.max === max)?.market;
  const rows = [...product.markets].sort(
    (a, b) => a.min - b.min || a.max - b.max
  );

  const diff = product.today - product.yesterday;
  const diffText =
    diff > 0
      ? `গতকালের তুলনায় আজকের দাম বেড়েছে : ${toBn(diff)} টাকা`
      : diff < 0
        ? `গতকালের তুলনায় আজকের দাম কমেছে : ${toBn(Math.abs(diff))} টাকা`
        : "গতকালের দামই আজ আছে";

  const summary = [
    { label: "সর্বনিম্ন দাম", value: min, note: minMarket, color: "text-fall" },
    { label: "সর্বোচ্চ দাম", value: max, note: maxMarket, color: "text-rise" },
    {
      label: "গড় দাম",
      value: avg,
      note: `${unit}-এর গড় হিসাব`,
      color: "text-fall",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      {/* breadcrumb */}
      <nav className="text-xs text-muted">
        <Link href="/" className="hover:text-brand">হোম</Link>
        {" › "}
        <Link href={`/category/${product.category}`} className="hover:text-brand">
          {product.categoryNameBn}
        </Link>
        {" › "}
        <span className="text-ink">{product.nameBn}</span>
      </nav>

      {/* summary */}
      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gray-100 text-4xl">
            {product.image}
          </span>
          <div>
            <h1 className="text-2xl font-bold">{product.nameBn}</h1>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
              {unit}
              <Link
                href={`/category/${product.category}`}
                className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand"
              >
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
            </p>
            <p className="mt-1 text-xs text-muted">{diffText}</p>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 px-6 py-4 text-center">
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="text-4xl font-bold">{toBn(product.today)}</p>
          <p className="text-xs text-muted">টাকা / {unitShort}</p>
          <div className="mt-2">
            <ChangeBadge change={product.change} />
          </div>
        </div>
      </section>

      {/* price summary */}
      <section>
        <h2 className="mb-3 text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {summary.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-line bg-white p-4 shadow-sm"
            >
              <p className="text-xs text-muted">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>
                {toBn(s.value)}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="mt-1 text-xs text-muted">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* market table */}
      <section>
        <h2 className="mb-3 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-gray-50 text-xs text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">বাজার</th>
                <th className="px-4 py-3 font-medium">বিভাগ</th>
                <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-medium">সর্বোচ্চ</th>
                <th className="px-4 py-3 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.market} className="odd:bg-white even:bg-gray-50/70">
                  <td className="px-4 py-3 font-medium">{m.market}</td>
                  <td className="px-4 py-3 text-muted">{m.division}</td>
                  <td className="px-4 py-3 text-right">{toBn(m.min)} টাকা</td>
                  <td className="px-4 py-3 text-right">{toBn(m.max)} টাকা</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {avgBn((m.min + m.max) / 2)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}