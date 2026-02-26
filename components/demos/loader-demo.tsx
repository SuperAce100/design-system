"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Loader } from "@/registry/new-york/blocks/loader/loader";

export default function LoaderDemo() {
  const pathname = usePathname();
  const speed = pathname.startsWith("/demo/") ? 0 : 1;

  return (
    <div className="flex items-center justify-center gap-6 overflow-x-auto p-8">
      <Loader shape="sphere" variant="blur" color="#0ea5e9" speed={speed} />
      <Loader className="dark:hidden" shape="swirl" variant="plain" size="sm" color="#0a0a0a" speed={speed} />
      <Loader className="hidden dark:block" shape="swirl" variant="plain" size="sm" color="#ffffff" speed={speed} />
      <Loader shape="sphere" variant="dither" color="#ea580c" speed={speed} />
      <Loader shape="ripple" variant="blur" color="#e879f9" speed={speed} />
      <Loader shape="swirl" variant="dither" size="sm" color="#e11d48" speed={speed} />
    </div>
  );
}
