import { Button } from "@/registry/new-york/blocks/button/button";
import { Textarea } from "@/registry/new-york/blocks/textarea/textarea";
import { Send } from "lucide-react";

export default function ChatInput() {
  return (
    <div className="flex flex-row items-center justify-between gap-2 max-w-xl relative w-full group">
      <Textarea placeholder="Type something..." showHandle={false} className="w-full min-h-24" />
      <div className="flex flex-row h-10 items-end justify-between gap-2 absolute left-2 right-2 bottom-2">
        <Button variant="default" size="icon" className="ml-auto">
          <Send />
        </Button>
      </div>
    </div>
  );
}
