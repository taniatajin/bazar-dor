import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-muted">{subtitle}</p>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-sm">
        {children}
        <p className="mt-5 text-center text-sm text-muted">{footer}</p>
      </div>

      <p className="mt-6 text-center text-sm">
        <Link href="/" className="text-muted hover:text-brand">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}