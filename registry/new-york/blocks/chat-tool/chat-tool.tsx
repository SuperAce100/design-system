import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DynamicToolUIPart, ToolUIPart } from "ai";
import { cn } from "@/lib/utils";
import { Wrench } from "lucide-react";

export default function ChatTool(toolMessagePart: ToolUIPart | DynamicToolUIPart) {
  if (toolMessagePart.type === "dynamic-tool") {
    return (
      <Accordion type="single" collapsible>
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

  const toolName = toolMessagePart.type.replace("tool-", "");

  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="tool"
        className={cn(
          " px-4 pl-2 border rounded-md hover:no-underline py-2 w-full my-2 last:border-b"
        )}
      >
        <AccordionTrigger className={cn("py-0 hover:no-underline hover:bg-transparent")}>
          <span>
            <Wrench className="w-4 h-4 mr-1 inline" />
            {toolMessagePart.state === "output-available" ? "Used " : "Using "}
            {toolName}
          </span>
        </AccordionTrigger>
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
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
