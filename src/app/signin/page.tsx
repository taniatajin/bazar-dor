import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { safeNext } from "@/lib/utils";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = { title: "সাইন ইন — বাজার দর" };

type PageProps = {
  searchParams: Promise<{ next?: string; reason?: string }>;
};

export default async function SignInPage({ searchParams }: PageProps) {
  const { next, reason } = await searchParams;

  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/");

  return (
    <SignInForm next={safeNext(next)} protectedNotice={reason === "protected"} />
  );
}