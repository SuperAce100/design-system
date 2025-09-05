"use client";

import Chat from "@/registry/new-york/blocks/chat/chat";

export default function ChatDemo() {
  return (
    <div
      className="w-full mx-auto flex-1 min-h-0 rounded-lg  max-h-[400px] flex flex-col"
      style={{ zoom: 0.75 }}
    >
      <Chat className="flex-1 min-h-0" />
    </div>
  );
}
