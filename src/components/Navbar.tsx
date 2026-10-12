"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types";
import AuthButtons from "./AuthButtons";

export default function Navbar({
  categories,
  dateText,
}: {
  categories: Category[];
  dateText: string;
}) {
  const pathname = usePathname();

  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-xl text-white">
            🛒
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold">বাজার দর</span>
            <span className="block text-[11px] text-muted">{dateText}</span>
          </span>
        </Link>

        <AuthButtons />
      </div>

      <nav className="mx-auto max-w-6xl overflow-x-auto px-4 pb-3">
        <ul className="flex w-max min-w-full items-center gap-1 md:justify-center">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <li key={c.id}>
                <Link
                  href={`/category/${c.slug}`}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition ${
                    active
                      ? "bg-brand font-semibold text-white"
                      : "text-ink hover:bg-brand-soft"
                  }`}
                >
                  <span>{c.icon}</span>
                  {c.nameBn}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}