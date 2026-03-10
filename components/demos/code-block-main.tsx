import { CodeBlock } from "@/registry/new-york/blocks/code-block/code-block";

const code = `const greeting = "Hello, world!";
console.log(greeting);`;

export default function CodeBlockMain() {
  return <CodeBlock code={code} language="typescript" />;
}
