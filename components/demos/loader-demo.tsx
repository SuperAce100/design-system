"use client";

import * as React from "react";
import { Loader } from "@/registry/new-york/blocks/loader/loader";

export default function LoaderDemo() {
  return (
    <div className="flex flex-col gap-8 p-8 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-12 scale-200">
          <Loader variant="spinner" />
          <Loader variant="dots" />
          <Loader variant="pulse" />
        </div>
      </div>
    </div>
  );
}
