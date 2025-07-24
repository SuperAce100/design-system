import { Badge } from "@/registry/new-york/blocks/badge/badge";
import { Check, Pause, TriangleAlert, X } from "lucide-react";

export default function BadgeDemo() {
  return (
    <div className="flex max-w-sm flex-col gap-8">
      <div className="flex w-full flex-row flex-wrap items-center justify-center gap-2">
        <Badge variant="fancy" color="primary" className="hover:rotate-2 hover:scale-105">
          Primary
        </Badge>
        <Badge variant="fancy" color="emerald" className="hover:rotate-2 hover:scale-105">
          <Check />
          Available
        </Badge>
        <Badge variant="fancy" color="red" className="hover:rotate-2 hover:scale-105">
          <X />
          Disabled
        </Badge>
        <Badge variant="fancy" color="amber" className="hover:rotate-2 hover:scale-105">
          <TriangleAlert />
          Warning
        </Badge>
        <Badge variant="fancy" color="sky" className="hover:rotate-2 hover:scale-105" showDot>
          Ready
        </Badge>
        <Badge variant="fancy" color="indigo" className="hover:rotate-2 hover:scale-105">
          Upgraded
        </Badge>
        <Badge variant="fancy" color="orange" className="hover:rotate-2 hover:scale-105">
          <Pause />
          Paused
        </Badge>
      </div>
      <div className="flex w-full flex-row flex-wrap items-center justify-center gap-2">
        <Badge variant="regular" color="primary" className="hover:rotate-2 hover:scale-105" showDot>
          Primary
        </Badge>
        <Badge variant="regular" color="emerald" className="hover:rotate-2 hover:scale-105">
          <Check />
          Available
        </Badge>
        <Badge variant="regular" color="red" className="hover:rotate-2 hover:scale-105">
          <X />
          Disabled
        </Badge>
        <Badge variant="regular" color="amber" className="hover:rotate-2 hover:scale-105">
          <TriangleAlert />
          Warning
        </Badge>
        <Badge variant="regular" color="sky" className="hover:rotate-2 hover:scale-105" showDot>
          Ready
        </Badge>
        <Badge variant="regular" color="indigo" className="hover:rotate-2 hover:scale-105">
          Upgraded
        </Badge>
        <Badge variant="regular" color="orange" className="hover:rotate-2 hover:scale-105">
          <Pause />
          Paused
        </Badge>
      </div>
      <div className="flex w-full flex-row flex-wrap items-center justify-center gap-2">
        <Badge variant="outline" color="primary" className="hover:rotate-2 hover:scale-105" showDot>
          Primary
        </Badge>
        <Badge variant="outline" color="emerald" className="hover:rotate-2 hover:scale-105">
          <Check />
          Available
        </Badge>
        <Badge variant="outline" color="red" className="hover:rotate-2 hover:scale-105">
          <X />
          Disabled
        </Badge>
        <Badge variant="outline" color="amber" className="hover:rotate-2 hover:scale-105">
          <TriangleAlert />
          Warning
        </Badge>
        <Badge variant="outline" color="sky" className="hover:rotate-2 hover:scale-105" showDot>
          Ready
        </Badge>
        <Badge variant="outline" color="indigo" className="hover:rotate-2 hover:scale-105">
          Upgraded
        </Badge>
        <Badge variant="outline" color="orange" className="hover:rotate-2 hover:scale-105">
          <Pause />
          Paused
        </Badge>
      </div>
    </div>
  );
}
