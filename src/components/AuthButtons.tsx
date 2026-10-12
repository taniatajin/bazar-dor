"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ChevronDown, LogOut, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Avatar from "./Avatar";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleSignOut = async () => {
    setOpen(false);
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return <div className="skeleton h-9 w-28 rounded-full" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="btn btn-sm border-none bg-brand text-white shadow hover:bg-brand-dark sm:btn-md"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { name, email, image } = session.user;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full px-1 py-1 transition hover:bg-gray-100 sm:pr-3"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar name={name} image={image} size={34} />
        <span className="hidden text-sm font-medium sm:inline">
          {name.split(" ")[0]}
        </span>
        <ChevronDown size={14} className="text-muted" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-60 rounded-xl border border-line bg-white p-3 shadow-lg">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="truncate text-xs text-muted">{email}</p>
          <div className="my-2 border-t border-line" />
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-gray-50"
          >
            <User size={15} /> আমার প্রোফাইল
          </Link>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-rise hover:bg-rise-soft"
          >
            <LogOut size={15} /> সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}