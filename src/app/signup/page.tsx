import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = { title: "সাইন আপ — বাজার দর" };

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/");

  return <SignUpForm />;
}