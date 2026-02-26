"use client";

import * as React from "react";
import { Loader } from "@/registry/new-york/blocks/loader/loader";

export default function LoaderDemo() {
  return (
    <div className="flex items-center justify-center gap-6 overflow-x-auto p-8">
      <Loader shape="sphere" variant="blur" color="var(--color-primary)" />
      <Loader shape="swirl" variant="plain" color="var(--color-foreground)" />
      <Loader shape="sphere" variant="dither" color="var(--color-orange-600)" />
      <Loader shape="ripple" variant="blur" color="var(--color-fuchsia-400)" />
      <Loader shape="swirl" variant="dither" color="var(--color-rose-600)" />
    </div>
  );
}
