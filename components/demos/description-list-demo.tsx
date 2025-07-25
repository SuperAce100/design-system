import { DescriptionList } from "@/registry/new-york/blocks/description-list/description-list";

export default function DescriptionListDemo() {
  return (
    <div className="space-y-4 w-full">
      <DescriptionList
        data={{
          name: "John Doe",
          age: 30,
          email: "john.doe@example.com",
          address: "123 Main St, Anytown, USA",
          phone: "+1234567890",
        }}
        layout="stacked"
      />
      <DescriptionList
        data={{
          Name: "John Doe",
          Age: 30,
          Email: "john.doe@example.com",
          Address: "123 Main St, Anytown, USA",
          Phone: "+1234567890",
        }}
        layout="default"
      />
    </div>
  );
}
