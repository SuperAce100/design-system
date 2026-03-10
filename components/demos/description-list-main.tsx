import { DescriptionList } from "@/registry/new-york/blocks/description-list/description-list";

export default function DescriptionListMain() {
  return (
    <DescriptionList
      data={{
        Name: "Jane Smith",
        Role: "Engineer",
        Status: "Active",
      }}
    />
  );
}
