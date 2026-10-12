import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "@/components/auth/UpdateProfileForm";

export const metadata: Metadata = { title: "তথ্য আপডেট — বাজার দর" };

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?next=/profile/update&reason=protected");

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="text-sm text-muted">আপনার নাম বদলে নিন।</p>
      </div>

      <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-semibold">তথ্য</h2>
        <UpdateProfileForm defaultName={session.user.name} />
      </div>
    </div>
  );
}