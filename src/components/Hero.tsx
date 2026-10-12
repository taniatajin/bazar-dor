import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { banglaDate } from "@/lib/format";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      <div className="grid items-center gap-6 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
            {banglaDate()}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 max-w-lg text-sm text-muted sm:text-base">
            ডাল, চাল, তেল, সবজি, মাছ, ডিম ও মসলার দাম — বাজারভিত্তিক বিশ্লেষণ,
            সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn mt-6 border-none bg-brand text-white shadow hover:bg-brand-dark"
          >
            সব পণ্য দেখুন <ArrowDown size={16} />
          </a>
        </div>

        <div className="flex justify-center">
          <Image
            src="/hero.png"
            alt="সবজির ঝুড়ির ছবি"
            width={315}
            height={263}
            priority
            className="h-auto w-full max-w-xs md:max-w-sm"
          />
        </div>
      </div>
    </section>
  );
}