"use client";

import { ArrowUp, BellOff, Trash2 } from "lucide-react";

import { LongPressButton } from "@/registry/new-york/blocks/long-press-button/long-press-button";

export default function LongPressButtonDemo() {
  return (
    <div className="w-full max-w-[640px] rounded-2xl bg-[#ececec] p-6">
      <div className="flex items-center justify-center gap-8 sm:gap-12">
        <LongPressButton
          aria-label="Mute notifications"
          className="h-24 w-24 rounded-full border-0 bg-[#ede0d7] px-0 py-0 text-[#f97316] hover:bg-[#e6d4c9] focus-visible:ring-[#f97316]/45"
          progressClassName="bg-[#f97316]/25"
        >
          <BellOff className="size-11" strokeWidth={2.3} />
        </LongPressButton>
        <LongPressButton
          aria-label="Upload"
          className="h-24 w-24 rounded-full border-0 bg-[#dae0ea] px-0 py-0 text-[#3b82f6] hover:bg-[#ced8e8] focus-visible:ring-[#3b82f6]/45"
          progressClassName="bg-[#3b82f6]/25"
        >
          <ArrowUp className="size-11" strokeWidth={2.3} />
        </LongPressButton>
        <LongPressButton
          aria-label="Delete"
          className="h-24 w-24 rounded-full border-0 bg-[#ebdde0] px-0 py-0 text-[#ff2d3d] hover:bg-[#e5d2d6] focus-visible:ring-[#ff2d3d]/45"
          progressClassName="bg-[#ff2d3d]/25"
        >
          <Trash2 className="size-11" strokeWidth={2.3} />
        </LongPressButton>
      </div>
      <div className="sr-only" aria-live="polite">
        Long press any button to confirm the action.
      </div>
    </div>
  );
}
