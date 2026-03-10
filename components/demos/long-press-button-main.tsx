"use client";

import { LongPressButton } from "@/registry/new-york/blocks/long-press-button/long-press-button";
import { Trash2 } from "lucide-react";

export default function LongPressButtonMain() {
  return (
    <LongPressButton aria-label="Delete item">
      <Trash2 className="size-4" />
      Hold to delete
    </LongPressButton>
  );
}
