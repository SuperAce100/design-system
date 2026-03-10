import { CodeBlock } from "@/registry/new-york/blocks/code-block/code-block";

const code = `const component = "button";
const style = "default";`;

export default function CodeBlockMainDemo() {
  return <CodeBlock code={code} language="tsx" title="example.tsx" className="w-full max-w-lg" />;
}
