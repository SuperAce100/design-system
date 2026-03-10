import Markdown from "@/registry/new-york/blocks/markdown/markdown";

const content = `## Getting Started

A **design system** is a collection of reusable components and clear standards.

> Good design is obvious. Great design is transparent.`;

export default function MarkdownPreview() {
  return <Markdown>{content}</Markdown>;
}
