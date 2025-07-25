import { PageHeader } from "@/registry/new-york/blocks/page-header/page-header";
import { Button } from "@/registry/new-york/blocks/button/button";

export default function PageHeaderDemo() {
  return (
    <div className="space-y-4 w-full">
      <PageHeader
        title="Page Header"
        description="This is a page header that'll fit nicely at the top of your page and be consistent"
      />
      <PageHeader title="Page Header">
        <Button variant="outline">Button</Button>
        <Button>Button</Button>
      </PageHeader>
      <PageHeader title="Page Header" description="This is a page header">
        <Button variant="outline">Button</Button>
        <Button>Button</Button>
      </PageHeader>
    </div>
  );
}
