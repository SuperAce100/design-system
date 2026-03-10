"use client";

import { Loader } from "@/registry/new-york/blocks/loader/loader";

export default function LoaderSizes() {
  return (
    <div className="flex items-center justify-center gap-8 p-4">
      <div className="flex flex-col items-center gap-2">
        <Loader shape="sphere" variant="blur" color="#0ea5e9" size="sm" />
        <span className="text-xs text-muted-foreground">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader shape="sphere" variant="blur" color="#0ea5e9" size="default" />
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader shape="sphere" variant="blur" color="#0ea5e9" size="lg" />
        <span className="text-xs text-muted-foreground">Large</span>
      </div>
    </div>
  );
}
