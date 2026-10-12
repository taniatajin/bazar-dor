"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthShell from "./AuthShell";
import Field from "./Field";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fail = (msg: string) => {
    setError(msg);
    toast.error(msg);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) return fail("আপনার নাম লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return fail("সঠিক ইমেইল দিন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("দুটো পাসওয়ার্ড মিলছে না");

    setLoading(true);
    const { error: authError } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (authError) {
      return fail(authError.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <AuthShell
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
      footer={
        <>
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-medium text-brand">
            সাইন ইন করুন
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Field
          label="নাম"
          placeholder="যেমন: রহিম উদ্দিন"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        <Field
          label="পাসওয়ার্ড নিশ্চিত করুন"
          type="password"
          placeholder="আবার লিখুন"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
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
            "অ্যাকাউন্ট তৈরি করুন"
          )}
        </button>
      </form>

      <SocialButtons callbackURL="/" />
    </AuthShell>
  );
}