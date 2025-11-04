"use client";

import * as React from "react";
import { Loader } from "@/registry/new-york/blocks/loader/loader";

export default function LoaderDemo() {
  return (
    <div className="flex flex-col gap-16 p-8 max-w-4xl mx-auto">
      {/* Variants */}
      <div className="flex flex-wrap items-center justify-center gap-12">
        <Loader variant="spinner" />
        <Loader variant="dots" />
        <Loader variant="pulse" />
      </div>

      {/* Size variants */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-center gap-12">
          <Loader variant="spinner" size="sm" />
          <Loader variant="spinner" size="default" />
          <Loader variant="spinner" size="lg" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-12">
          <Loader variant="dots" size="sm" />
          <Loader variant="dots" size="default" />
          <Loader variant="dots" size="lg" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-12">
          <Loader variant="pulse" size="sm" />
          <Loader variant="pulse" size="default" />
          <Loader variant="pulse" size="lg" />
        </div>
      </div>
    </div>
  );
}

