import { Suspense } from "react";
import Hero from "@/components/Hero";
import HomeSections from "@/components/HomeSections";
import { HomeSkeleton } from "@/components/Skeletons";

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<HomeSkeleton />}>
        <HomeSections />
      </Suspense>
    </>
  );
}