import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";

export const metadata: Metadata = { title: "আমার প্রোফাইল — বাজার দর" };

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?next=/profile&reason=protected");

  const { name, email, image } = session.user;

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-muted">আপনার অ্যাকাউন্টের তথ্য দেখুন।</p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={name} image={image} size={64} />
          <div className="min-w-0">
            <p className="text-lg font-semibold">{name}</p>
            <p className="truncate text-sm text-muted">{email}</p>
          </div>
        </div>
        <SignOutButton />
      </div>

      <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
        <h2 className="font-semibold">তথ্য</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">নাম</dt>
            <dd className="font-medium">{name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">ইমেইল</dt>
            <dd className="truncate font-medium">{email}</dd>
          </div>
        </dl>
        <Link
          href="/profile/update"
          className="btn mt-5 border-none bg-brand text-white shadow hover:bg-brand-dark"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}
