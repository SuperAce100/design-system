import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, UIMessage, stepCountIs, smoothStream } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-5-nano"),
    messages: convertToModelMessages(messages),
    providerOptions: {
      openai: {
        reasoningSummary: "auto",
      },
    },
    stopWhen: stepCountIs(100),
    experimental_transform: smoothStream(),
  });

  return result.toUIMessageStreamResponse();
}
