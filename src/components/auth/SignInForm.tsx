"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthShell from "./AuthShell";
import Field from "./Field";
import SocialButtons from "./SocialButtons";

export default function SignInForm({
  next,
  protectedNotice,
}: {
  next: string;
  protectedNotice: boolean;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    if (protectedNotice) {
      toast.error("বিস্তারিত দেখতে আগে সাইন ইন করুন", { id: "protected" });
    }
  }, [protectedNotice]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দুটোই দিন";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { error: authError } = await authClient.signIn.email({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (authError) {
      const msg = "ইমেইল বা পাসওয়ার্ড সঠিক নয়";
      setError(msg);
      toast.error(msg);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(next);
    router.refresh();
  };

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
      footer={
        <>
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-medium text-brand">
            সাইন আপ করুন
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Field
          label="ইমেইল"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <Field
          label="পাসওয়ার্ড"
          type="password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && <p className="text-sm text-rise">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn w-full border-none bg-brand text-white shadow hover:bg-brand-dark disabled:opacity-60"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "সাইন ইন"
          )}
        </button>
      </form>

      <SocialButtons callbackURL={next} />
    </AuthShell>
  );
}