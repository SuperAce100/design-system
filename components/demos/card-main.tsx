import { Card, CardTitle, CardDescription } from "@/registry/new-york/blocks/card/card";

export default function CardMain() {
  return (
    <Card className="max-w-sm">
      <CardTitle>Card Title</CardTitle>
      <CardDescription>
        This is a simple card with a title and description.
      </CardDescription>
    </Card>
  );
}
