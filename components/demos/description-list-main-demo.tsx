import { DescriptionList } from "@/registry/new-york/blocks/description-list/description-list";

export default function DescriptionListMainDemo() {
  return (
    <DescriptionList
      className="w-full max-w-lg"
      data={{
        project: "Design System",
        owner: "Product Design",
        status: "Active",
      }}
    />
  );
}
