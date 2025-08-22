import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DynamicToolUIPart, ToolUIPart } from "ai";

export default function ChatTool(toolMessagePart: ToolUIPart | DynamicToolUIPart) {
  if (toolMessagePart.type === "dynamic-tool") {
    return (
      <Accordion type="single" collapsible defaultValue="tool">
        <AccordionItem value="tool">
          <AccordionTrigger>{toolMessagePart.toolName}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-1">Input</div>
                <pre className="bg-muted rounded-md p-2 text-sm overflow-x-auto whitespace-pre-wrap">
                  {typeof toolMessagePart.input === "string"
                    ? toolMessagePart.input
                    : JSON.stringify(toolMessagePart.input, null, 2)}
                </pre>
              </div>
              {(toolMessagePart.state === "output-available" && (
                <div>
                  <div className="text-xs font-semibold text-muted-foreground mb-1">Output</div>
                  <pre className="bg-muted rounded-md p-2 text-sm overflow-x-auto whitespace-pre-wrap">
                    {typeof toolMessagePart.output === "string"
                      ? toolMessagePart.output
                      : JSON.stringify(toolMessagePart.output, null, 2)}
                  </pre>
                </div>
              )) ||
                (toolMessagePart.state === "output-error" && (
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">Error</div>
                    <pre className="bg-muted rounded-md p-2 text-sm overflow-x-auto whitespace-pre-wrap">
                      {toolMessagePart.errorText}
                    </pre>
                  </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return <Accordion>{toolMessagePart.toolName}</Accordion>;
}
