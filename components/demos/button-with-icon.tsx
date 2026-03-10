import { Button } from "@/registry/new-york/blocks/button/button";
import { Mail, ArrowRight, Plus } from "lucide-react";

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>
        <Mail /> Send Email
      </Button>
      <Button variant="outline">
        Next <ArrowRight />
      </Button>
      <Button size="icon" variant="secondary" aria-label="Add item">
        <Plus />
      </Button>
    </div>
  );
}
