"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Field from "./Field";

export default function UpdateProfileForm({
  defaultName,
}: {
  defaultName: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(defaultName);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Field
        label="নাম"
        placeholder="আপনার নাম"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="btn border-none bg-brand text-white shadow hover:bg-brand-dark disabled:opacity-60"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "আপডেট"
          )}
        </button>
        <Link href="/profile" className="text-sm text-muted hover:text-brand">
          বাতিল করুন
        </Link>
      </div>
    </form>
  );
}