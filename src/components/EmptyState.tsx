import Link from "next/link";

export default function EmptyState({
  title,
  message,
  code,
}: {
  title: string;
  message: string;
  code?: string;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
      {code && <p className="text-7xl font-bold text-brand">{code}</p>}
      <h1 className="mt-2 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-muted">{message}</p>
      <Link
        href="/"
        className="btn mt-6 border-none bg-brand text-white hover:bg-brand-dark"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}