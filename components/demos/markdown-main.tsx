import Markdown from "@/registry/new-york/blocks/markdown/markdown";

const content = `A **design system** is a collection of reusable components and guidelines. It helps teams build consistent, accessible interfaces at scale.

> Good design is obvious. Great design is transparent.`;

export default function MarkdownMain() {
  return <Markdown>{content}</Markdown>;
}
