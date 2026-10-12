"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { GitHubIcon, GoogleIcon } from "./icons";

type Provider = "google" | "github";

export default function SocialButtons({
  callbackURL = "/",
}: {
  callbackURL?: string;
}) {
  const [pending, setPending] = useState<Provider | null>(null);

  const handle = async (provider: Provider) => {
    setPending(provider);
    const { error } = await authClient.signIn.social({ provider, callbackURL });
    if (error) {
      setPending(null);
      toast.error("সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন");
    }
  };

  const cls =
    "flex flex-1 items-center justify-center gap-2 rounded-lg border border-line bg-white px-3 py-2.5 text-sm font-medium transition hover:bg-gray-50 disabled:opacity-60";

  return (
    <>
      <div className="my-5 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-line" />
        অথবা
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          disabled={pending !== null}
          onClick={() => handle("google")}
          className={cls}
        >
          <GoogleIcon /> Google দিয়ে চালিয়ে যান
        </button>
        <button
          type="button"
          disabled={pending !== null}
          onClick={() => handle("github")}
          className={cls}
        >
          <GitHubIcon /> GitHub দিয়ে চালিয়ে যান
        </button>
      </div>
    </>
  );
}