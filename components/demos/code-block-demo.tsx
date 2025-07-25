import { CodeBlock } from "@/registry/new-york/blocks/code-block/code-block";

const code = `def llm_call(prompt: str, system: str, model: str = "openai/gpt-4o-mini") -> str:
    """
    Make a LLM call
    """
    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": prompt},
    ]

    messages = [msg for msg in messages if msg is not None]
    kwargs: dict[str, Any] = {
        "model": model,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 1000,
    }
    response = client.chat.completions.create(**kwargs)
    if not response.choices or not response.choices[0].message.content:
        raise ValueError("No valid response content received from the API")

    return response.choices[0].message.content
`;

export default function CodeBlockDemo() {
  return (
    <div className="space-y-4 w-full">
      <CodeBlock code={code} language="python" title="llms.py" />
    </div>
  );
}
