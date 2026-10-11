import type { Category, Product } from "@/types";

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
  "https://openapi.programming-hero.com/api/bazardor",
];

async function fetchJson<T>(path: string): Promise<T | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, {
        next: { revalidate: 300 },
      });
      if (res.ok) return (await res.json()) as T;
    } catch {
      // pore porer API try korbe
    }
  }
  return null;
}

export async function getProducts(): Promise<Product[]> {
  const data = await fetchJson<Product[]>("/products");
  return Array.isArray(data) ? data : [];
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchJson<Category[]>("/categories");
  return Array.isArray(data) ? data : [];
}