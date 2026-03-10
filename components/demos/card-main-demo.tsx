import { Card, CardDescription, CardTitle } from "@/registry/new-york/blocks/card/card";

export default function CardMainDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardTitle>Weekly report</CardTitle>
      <CardDescription>Track milestones, blockers, and what ships next.</CardDescription>
    </Card>
  );
}
