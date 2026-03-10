"use client";

import { Loader } from "@/registry/new-york/blocks/loader/loader";

export default function LoaderShapes() {
  return (
    <div className="flex items-center justify-center gap-8 p-4">
      <div className="flex flex-col items-center gap-2">
        <Loader shape="sphere" variant="blur" color="#0ea5e9" />
        <span className="text-xs text-muted-foreground">Sphere</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader shape="swirl" variant="blur" color="#e879f9" />
        <span className="text-xs text-muted-foreground">Swirl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader shape="ripple" variant="blur" color="#ea580c" />
        <span className="text-xs text-muted-foreground">Ripple</span>
      </div>
    </div>
  );
}
