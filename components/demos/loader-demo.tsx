"use client";

import * as React from "react";
import { Loader } from "@/registry/new-york/blocks/loader/loader";

export default function LoaderDemo() {
  return (
    <div className="flex items-center justify-center gap-6 overflow-x-auto p-8">
      <Loader shape="sphere" variant="blur" color="#0ea5e9" />
      <Loader className="dark:hidden" shape="swirl" variant="plain" size="sm" color="#0a0a0a" />
      <Loader className="hidden dark:block" shape="swirl" variant="plain" size="sm" color="#ffffff" />
      <Loader shape="sphere" variant="dither" color="#ea580c" />
      <Loader shape="ripple" variant="blur" color="#e879f9" />
      <Loader shape="swirl" variant="dither" size="sm" color="#e11d48" />
    </div>
  );
}
