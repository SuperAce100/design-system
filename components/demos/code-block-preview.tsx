import { CodeBlock } from "@/registry/new-york/blocks/code-block/code-block";

const code = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}`;

export default function CodeBlockPreview() {
  return <CodeBlock code={code} language="typescript" />;
}
