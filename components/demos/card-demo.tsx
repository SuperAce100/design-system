import { Card, CardTitle, CardDescription } from "@/registry/new-york/blocks/card/card";

export default function CardDemo() {
  return (
    <div className="grid w-full h-full grid-cols-2 gap-4">
      <Card variant="default">
        <CardTitle>Default</CardTitle>
        <CardDescription>
          This is a card with some informative text and space to add more useful stuff.
        </CardDescription>
      </Card>
      <Card variant="raised">
        <CardTitle>Raised</CardTitle>
        <CardDescription>
          This is a card with some informative text and space to add more useful stuff.
        </CardDescription>
      </Card>
      <Card variant="flat">
        <CardTitle>Flat</CardTitle>
        <CardDescription>
          This is a card with some informative text and space to add more useful stuff.
        </CardDescription>
      </Card>
      <Card variant="outline">
        <CardTitle>Outline</CardTitle>
        <CardDescription>
          This is a card with some informative text and space to add more useful stuff.
        </CardDescription>
      </Card>
      <Card variant="fancy_light">
        <CardTitle>Fancy Light</CardTitle>
        <CardDescription>
          This is a card with some informative text and space to add more useful stuff.
        </CardDescription>
      </Card>
      <Card variant="double">
        <CardTitle>Double</CardTitle>
        <CardDescription>
          This is a card with some informative text and space to add more useful stuff.
        </CardDescription>
      </Card>
    </div>
  );
}
