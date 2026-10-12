"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  const handleClick = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-lg border border-rise px-4 py-2 text-sm font-medium text-rise transition hover:bg-rise-soft"
    >
      <LogOut size={15} /> সাইন আউট
    </button>
  );
}