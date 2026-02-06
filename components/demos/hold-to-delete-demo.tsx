"use client";

import * as React from "react";

import { HoldToDelete } from "@/registry/new-york/blocks/hold-to-delete/hold-to-delete";

type DemoState = "idle" | "canceled" | "deleted";

export default function HoldToDeleteDemo() {
  const [state, setState] = React.useState<DemoState>("idle");

  return (
    <div className="flex flex-col items-start gap-3 p-4">
      <HoldToDelete
        holdDuration={1600}
        onHoldComplete={() => setState("deleted")}
        onHoldCancel={() => setState("canceled")}
      >
        Hold to delete report
      </HoldToDelete>
      <p className="text-xs text-muted-foreground">
        {state === "idle" && "Hold for 1.6s to confirm deletion."}
        {state === "canceled" && "Hold canceled. Try again when ready."}
        {state === "deleted" && "Report deleted."}
      </p>
      <button
        type="button"
        className="text-xs font-medium text-primary underline underline-offset-4"
        onClick={() => setState("idle")}
      >
        Reset status
      </button>
    </div>
  );
}
