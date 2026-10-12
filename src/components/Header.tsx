import { Suspense } from "react";
import Navbar from "./Navbar";
import Ticker from "./Ticker";
import { getCategories } from "@/lib/api";
import { banglaDate } from "@/lib/format";

export default async function Header() {
  const categories = await getCategories();

  return (
    <header className="border-b border-line">
      <Navbar categories={categories} dateText={banglaDate()} />
      <Suspense fallback={<div className="skeleton h-10 w-full rounded-none" />}>
        <Ticker />
      </Suspense>
    </header>
  );
}