import { Badge } from "@/registry/new-york/blocks/badge/badge";

export default function BadgePreview() {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="fancy" color="emerald">Active</Badge>
      <Badge variant="regular" color="sky">Pending</Badge>
      <Badge variant="outline" color="amber">Review</Badge>
    </div>
  );
}
