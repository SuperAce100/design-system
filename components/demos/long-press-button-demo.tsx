"use client";

import { ArrowUp, BellOff, Trash2 } from "lucide-react";

import { LongPressButton } from "@/registry/new-york/blocks/long-press-button/long-press-button";

export default function LongPressButtonDemo() {
  return (
    <div className="w-full max-w-[640px]">
      <div className="flex items-center justify-center gap-6 sm:gap-9">
        <LongPressButton
          aria-label="Mute notifications"
          progressDirection="bottom-to-top"
          className="h-20 w-20 rounded-full border-0 bg-[#f97316]/15 px-0 py-0 text-[#f97316] shadow-none hover:bg-[#f97316]/22 focus-visible:ring-[#f97316]/45"
          progressClassName="bg-[#f97316]/25"
        >
          <BellOff className="size-9" strokeWidth={2.3} />
        </LongPressButton>
        <LongPressButton
          aria-label="Upload"
          progressDirection="bottom-to-top"
          className="h-20 w-20 rounded-full border-0 bg-[#3b82f6]/15 px-0 py-0 text-[#3b82f6] shadow-none hover:bg-[#3b82f6]/22 focus-visible:ring-[#3b82f6]/45"
          progressClassName="bg-[#3b82f6]/25"
        >
          <ArrowUp className="size-9" strokeWidth={2.3} />
        </LongPressButton>
        <LongPressButton
          aria-label="Delete"
          progressDirection="bottom-to-top"
          className="h-20 w-20 rounded-full border-0 bg-[#ff2d3d]/15 px-0 py-0 text-[#ff2d3d] shadow-none hover:bg-[#ff2d3d]/22 focus-visible:ring-[#ff2d3d]/45"
          progressClassName="bg-[#ff2d3d]/25"
        >
          <Trash2 className="size-9" strokeWidth={2.3} />
        </LongPressButton>
      </div>
      <div className="sr-only" aria-live="polite">
        Long press any button to confirm the action.
      </div>
    </div>
  );
}
