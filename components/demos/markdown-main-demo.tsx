import Markdown from "@/registry/new-york/blocks/markdown/markdown";

const markdown = `# Shipping update

Everything looks good.

- Build passed
- Preview deployed`;

export default function MarkdownMainDemo() {
  return <Markdown>{markdown}</Markdown>;
}
