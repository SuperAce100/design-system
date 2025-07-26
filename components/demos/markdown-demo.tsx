import Markdown from "@/registry/new-york/blocks/markdown/markdown";

const markdown = `
# Hello, world!
This is a **paragraph**. You may use it for LLM generations, _easy CMS_, or something else. It's based on \`<ReactMarkdown />\` and inspired by [Github Flavored Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

It has some pretty sweet components like:
- This unordered list
- This ordered list
- This code block

## This is a heading 2

### This is a heading 3

#### This is a heading 4

##### This is a heading 5

###### This is a heading 6

We can also use ordered lists.

1. Item 1
2. Item 2
3. Item 3

> This is a quote.

### It supports code blocks
\`\`\`tsx
const a = 1;
const b = 2;
\`\`\`

### And images
![San Francisco](https://images.unsplash.com/photo-1586145571648-77f9424a97d6?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

It also supports tables:

| Name | Age |
|------|-----|
| John | 25  |
| Jane | 30  |




`;

export default function MarkdownDemo() {
  return <Markdown>{markdown}</Markdown>;
}
