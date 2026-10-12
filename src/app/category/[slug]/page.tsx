import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import CategoryView from "@/components/CategoryView";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  return {
    title: category
      ? `${category.nameBn} — বাজার দর`
      : "পাওয়া যায়নি — বাজার দর",
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const items = products.filter((p) => p.category === slug);

  return <CategoryView category={category} products={items} />;
}