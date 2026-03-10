"use client";

import Chat from "@/registry/new-york/blocks/chat/chat";

export default function ChatMainDemo() {
  return (
    <div className="mx-auto flex max-h-[360px] w-full max-w-2xl flex-1 flex-col rounded-lg" style={{ zoom: 0.8 }}>
      <Chat className="min-h-0 flex-1" />
    </div>
  );
}
