import * as React from "react";

import BadgeDemo from "@/components/demos/badge-demo";
import ButtonDemo from "@/components/demos/button-demo";
import LongPressButtonDemo from "@/components/demos/long-press-button-demo";
import RevealDemo from "@/components/demos/reveal-demo";
import CardDemo from "@/components/demos/card-demo";
import DescriptionListDemo from "@/components/demos/description-list-demo";
import PageHeaderDemo from "@/components/demos/page-header-demo";
import MotionBlurTextDemo from "@/components/demos/motion-blur-text";
import WindowDemo from "@/components/demos/window-demo";
import CodeBlockDemo from "@/components/demos/code-block-demo";
import MarkdownDemo from "@/components/demos/markdown-demo";
import InputDemo from "@/components/demos/input-demo";
import NumberInputDemo from "@/components/demos/number-input-demo";
import TextareaDemo from "@/components/demos/textarea-demo";
import ChatInputDemo from "@/components/demos/chat-input-demo";
import SelectDemo from "@/components/demos/select-demo";
import ChatMessageDemo from "@/components/demos/chat-message-demo";
import JSXPreviewDemo from "@/components/demos/jsx-preview-demo";
import PointerDemo from "@/components/demos/pointer-demo";
import ChatReasoningDemo from "@/components/demos/chat-reasoning-demo";
import ChatToolDemo from "@/components/demos/chat-tool-demo";
import ChatDemo from "@/components/demos/chat-demo";
import InvisibleInputDemo from "@/components/demos/invisible-input-demo";
import CommandPromptDemo from "@/components/demos/command-prompt-demo";
import LoaderDemo from "@/components/demos/loader-demo";
import MorphingTextDemo from "@/components/demos/morphing-text-demo";
import AsciiWaveDemo from "@/components/demos/ascii-wave-demo";
import ColorPickerDemo from "@/components/demos/color-picker-demo";

import ButtonMain from "@/components/demos/button-main";
import ButtonSizes from "@/components/demos/button-sizes";
import ButtonWithIcon from "@/components/demos/button-with-icon";
import ButtonDisabled from "@/components/demos/button-disabled";
import BadgeMain from "@/components/demos/badge-main";
import BadgeColors from "@/components/demos/badge-colors";
import BadgeWithDot from "@/components/demos/badge-with-dot";
import CardMain from "@/components/demos/card-main";
import InputWithLabel from "@/components/demos/input-with-label";
import InputDisabled from "@/components/demos/input-disabled";
import TextareaNoResize from "@/components/demos/textarea-no-resize";
import NumberInputBounds from "@/components/demos/number-input-bounds";
import CodeBlockMain from "@/components/demos/code-block-main";
import MarkdownMain from "@/components/demos/markdown-main";
import LongPressButtonMain from "@/components/demos/long-press-button-main";
import ChatMessageMain from "@/components/demos/chat-message-main";
import ChatToolMain from "@/components/demos/chat-tool-main";
import InvisibleInputMain from "@/components/demos/invisible-input-main";
import DescriptionListMain from "@/components/demos/description-list-main";
import PageHeaderMain from "@/components/demos/page-header-main";
import LoaderMain from "@/components/demos/loader-main";
import LoaderShapes from "@/components/demos/loader-shapes";
import LoaderSizes from "@/components/demos/loader-sizes";

export type ComponentMeta = {
  id: string;
  name: string;
  section: "Primitives" | "AI" | "Effects";
  description: string;
};

export type DemoEntry = {
  name: string;
  description?: string;
  component: React.ReactNode;
  file: string;
};

export type ComponentDemos = {
  main: DemoEntry;
  examples?: DemoEntry[];
};

export const sectionOrder: ComponentMeta["section"][] = ["Primitives", "AI", "Effects"];

export const componentList: ComponentMeta[] = [
  {
    id: "window",
    name: "Window",
    section: "Primitives",
    description: "A draggable, resizable window inside a container.",
  },
  {
    id: "badge",
    name: "Badge",
    section: "Primitives",
    description: "A clean set of badge components with an edible look.",
  },
  {
    id: "button",
    name: "Button",
    section: "Primitives",
    description: "A button component that *feels* good to use.",
  },
  {
    id: "long-press-button",
    name: "Long Press Button",
    section: "Primitives",
    description: "A long-press action button with animated hold progress.",
  },
  {
    id: "code-block",
    name: "Code Block",
    section: "Primitives",
    description: "A code block with syntax highlighting and quick copying.",
  },
  {
    id: "markdown",
    name: "Markdown",
    section: "Primitives",
    description: "A markdown component with a clean look and no-frills parsing.",
  },
  {
    id: "select",
    name: "Select",
    section: "Primitives",
    description: "A lightly skinned select component.",
  },
  {
    id: "input",
    name: "Input",
    section: "Primitives",
    description: "A simple input component with a tactile feel.",
  },
  {
    id: "number-input",
    name: "Number Input",
    section: "Primitives",
    description:
      "A number input with keyboard stepping, bounds, and a drag handle for quick adjustments.",
  },
  {
    id: "command-prompt",
    name: "Command Prompt",
    section: "Primitives",
    description: "A keyboard-first command prompt with history and autocomplete.",
  },
  {
    id: "invisible-input",
    name: "Invisible Input",
    section: "Primitives",
    description: "An unstyled input that looks like text; fully styleable.",
  },
  {
    id: "textarea",
    name: "Textarea",
    section: "Primitives",
    description: "An input that can increase in height to accommodate more text.",
  },
  {
    id: "card",
    name: "Card",
    section: "Primitives",
    description: "A variety of clean cards, from minimal to flashy.",
  },
  {
    id: "description-list",
    name: "Description List",
    section: "Primitives",
    description: "Quickly display a json object in an aesthetically pleasing way.",
  },
  {
    id: "page-header",
    name: "Page Header",
    section: "Primitives",
    description: "A clean page header so your pages look consistent.",
  },
  {
    id: "chat",
    name: "Chat",
    section: "AI",
    description:
      "A full chat component with tool calling, reasoning, etc. using the AI SDK. Just add an OpenAI key.",
  },
  {
    id: "chat-input",
    name: "Chat Input",
    section: "AI",
    description:
      "A chat input component with status indicators, model selection, and more. Ready for useChat().",
  },
  {
    id: "chat-message",
    name: "Chat Message",
    section: "AI",
    description: "A configurable chat message including markdown support, tool calls, etc.",
  },
  {
    id: "chat-reasoning",
    name: "Reasoning",
    section: "AI",
    description:
      "A chat reasoning component that automatically collapses, contains tool calls, and more.",
  },
  {
    id: "chat-tool",
    name: "Tool Call",
    section: "AI",
    description:
      "A component that displays tool calls as they stream in in a nice collapsible display.",
  },
  {
    id: "jsx-preview",
    name: "JSX Preview",
    section: "AI",
    description:
      "A preview of a JSX component rendered from a string. Useful for LLM-generated UIs.",
  },
  {
    id: "pointer",
    name: "Pointer",
    section: "AI",
    description: "A controllable on-screen pointer that moves to coordinates and shows thoughts.",
  },
  {
    id: "reveal",
    name: "Reveal",
    section: "Effects",
    description: "A simple wrapper that animates content when it scrolls into view.",
  },
  {
    id: "motion-blur-text",
    name: "Motion Blur Text",
    section: "Effects",
    description: "A motion blur text effect that can be used to show motion.",
  },
  {
    id: "loader",
    name: "Loader",
    section: "Primitives",
    description:
      "Custom WebGL shader loaders with 3 shapes (sphere, swirl, ripple) × 3 styles (plain, blur, dither).",
  },
  {
    id: "morphing-text",
    name: "Morphing Text",
    section: "Effects",
    description: "Text that smoothly animates character changes when the value updates.",
  },
  {
    id: "ascii-wave",
    name: "ASCII Wave",
    section: "Effects",
    description: "A flowing ASCII animation with wave-based coloring. Inspired by exa.ai.",
  },
  {
    id: "color-picker",
    name: "Color Picker",
    section: "Primitives",
    description: "A color picker with OKLCH, HSL, RGB, and HEX support, plus Tailwind CSS presets.",
  },
];

export type ComponentDemoLayout = {
  demoPageScale?: number;
  homepageScale?: number;
  needsFlexColumnParent?: boolean;
  homepageContainerClassName?: string;
  homepageOffsetX?: number;
  homepageOffsetY?: number;
};

const demoLayoutMap: Record<string, ComponentDemoLayout> = {
  badge: {
    demoPageScale: 1.5,
    homepageScale: 0.95,
  },
  button: {
    homepageScale: 0.82,
  },
  "long-press-button": {
    homepageScale: 0.78,
  },
  "code-block": {
    demoPageScale: 1,
    homepageScale: 0.5,
    homepageContainerClassName: "w-[28rem]",
  },
  markdown: {
    demoPageScale: 0.5,
    homepageScale: 0.24,
    homepageContainerClassName: "w-[44rem]",
    homepageOffsetY: -12,
  },
  select: {
    homepageScale: 0.72,
  },
  input: {
    homepageScale: 0.82,
  },
  "number-input": {
    homepageScale: 0.72,
  },
  "command-prompt": {
    demoPageScale: 2,
    homepageScale: 0.5,
    homepageContainerClassName: "w-[32rem]",
  },
  "invisible-input": {
    demoPageScale: 2,
    homepageScale: 0.72,
    homepageContainerClassName: "w-[20rem]",
  },
  textarea: {
    demoPageScale: 2,
    homepageScale: 0.58,
    homepageContainerClassName: "w-[26rem]",
  },
  card: {
    demoPageScale: 1,
    homepageScale: 0.38,
    homepageContainerClassName: "w-[36rem]",
  },
  "description-list": {
    demoPageScale: 1,
    homepageScale: 0.54,
    homepageContainerClassName: "w-[24rem]",
  },
  "page-header": {
    demoPageScale: 1.5,
    homepageScale: 0.55,
    homepageContainerClassName: "w-[30rem]",
  },
  chat: {
    demoPageScale: 2,
    homepageScale: 0.38,
    homepageContainerClassName: "h-[18rem] w-[24rem]",
  },
  "chat-input": {
    demoPageScale: 1.5,
    homepageScale: 0.48,
    homepageContainerClassName: "w-[30rem]",
  },
  "chat-message": {
    demoPageScale: 1,
    homepageScale: 0.34,
    homepageContainerClassName: "w-[40rem]",
  },
  "chat-reasoning": {
    demoPageScale: 2,
    homepageScale: 0.7,
  },
  "chat-tool": {
    demoPageScale: 2,
    homepageScale: 0.52,
    homepageContainerClassName: "w-[24rem]",
  },
  "jsx-preview": {
    demoPageScale: 2,
    homepageScale: 0.56,
    homepageContainerClassName: "w-[22rem]",
  },
  pointer: {
    demoPageScale: 1,
    homepageScale: 0.42,
    needsFlexColumnParent: true,
    homepageContainerClassName: "h-[18rem] w-[22rem]",
  },
  window: {
    demoPageScale: 1,
    homepageScale: 0.34,
    needsFlexColumnParent: true,
    homepageContainerClassName: "h-[18rem] w-[24rem]",
  },
  reveal: {
    demoPageScale: 2,
    homepageScale: 0.44,
    homepageContainerClassName: "w-[26rem]",
  },
  "motion-blur-text": {
    demoPageScale: 2,
    homepageScale: 0.4,
    homepageContainerClassName: "w-[26rem]",
  },
  loader: {
    demoPageScale: 2,
    homepageScale: 0.55,
    homepageContainerClassName: "w-[26rem]",
  },
  "morphing-text": {
    demoPageScale: 2,
    homepageScale: 0.48,
    homepageContainerClassName: "w-[24rem]",
  },
  "ascii-wave": {
    demoPageScale: 2,
    homepageScale: 0.22,
    homepageContainerClassName: "w-[46rem]",
    homepageOffsetY: -18,
  },
  "color-picker": {
    demoPageScale: 1.5,
    homepageScale: 0.4,
    homepageContainerClassName: "w-[25rem]",
  },
};

const previewDemoMap: Record<string, React.ReactNode> = {
  window: <WindowDemo />,
  badge: <BadgeDemo />,
  button: <ButtonDemo />,
  "long-press-button": <LongPressButtonDemo />,
  "code-block": <CodeBlockDemo />,
  markdown: <MarkdownDemo />,
  select: <SelectDemo />,
  input: <InputDemo />,
  "number-input": <NumberInputDemo />,
  "command-prompt": <CommandPromptDemo />,
  "invisible-input": <InvisibleInputDemo />,
  textarea: <TextareaDemo />,
  card: <CardDemo />,
  "description-list": <DescriptionListDemo />,
  "page-header": <PageHeaderDemo />,
  "chat-input": <ChatInputDemo />,
  "chat-message": <ChatMessageDemo />,
  "chat-reasoning": <ChatReasoningDemo />,
  "chat-tool": <ChatToolDemo />,
  chat: <ChatDemo />,
  "jsx-preview": <JSXPreviewDemo />,
  pointer: <PointerDemo />,
  reveal: <RevealDemo />,
  "motion-blur-text": <MotionBlurTextDemo />,
  loader: <LoaderDemo />,
  "morphing-text": <MorphingTextDemo />,
  "ascii-wave": <AsciiWaveDemo />,
  "color-picker": <ColorPickerDemo />,
};

const componentDemosMap: Record<string, ComponentDemos> = {
  button: {
    main: {
      name: "Default",
      component: <ButtonMain />,
      file: "components/demos/button-main.tsx",
    },
    examples: [
      {
        name: "Variants",
        description: "All available button variants.",
        component: <ButtonDemo />,
        file: "components/demos/button-demo.tsx",
      },
      {
        name: "Sizes",
        description: "Buttons in different sizes.",
        component: <ButtonSizes />,
        file: "components/demos/button-sizes.tsx",
      },
      {
        name: "With Icon",
        description: "Buttons with leading or trailing icons.",
        component: <ButtonWithIcon />,
        file: "components/demos/button-with-icon.tsx",
      },
      {
        name: "Disabled",
        description: "Disabled button state.",
        component: <ButtonDisabled />,
        file: "components/demos/button-disabled.tsx",
      },
    ],
  },
  badge: {
    main: {
      name: "Default",
      component: <BadgeMain />,
      file: "components/demos/badge-main.tsx",
    },
    examples: [
      {
        name: "Variants",
        description: "All badge variant styles.",
        component: <BadgeDemo />,
        file: "components/demos/badge-demo.tsx",
      },
      {
        name: "Colors",
        description: "Available badge color options.",
        component: <BadgeColors />,
        file: "components/demos/badge-colors.tsx",
      },
      {
        name: "With Dot",
        description: "Badges with a status dot indicator.",
        component: <BadgeWithDot />,
        file: "components/demos/badge-with-dot.tsx",
      },
    ],
  },
  card: {
    main: {
      name: "Default",
      component: <CardMain />,
      file: "components/demos/card-main.tsx",
    },
    examples: [
      {
        name: "Variants",
        description: "All available card variants.",
        component: <CardDemo />,
        file: "components/demos/card-demo.tsx",
      },
    ],
  },
  input: {
    main: {
      name: "Default",
      component: <InputDemo />,
      file: "components/demos/input-demo.tsx",
    },
    examples: [
      {
        name: "With Label",
        description: "Input paired with a label element.",
        component: <InputWithLabel />,
        file: "components/demos/input-with-label.tsx",
      },
      {
        name: "Disabled",
        description: "Disabled input state.",
        component: <InputDisabled />,
        file: "components/demos/input-disabled.tsx",
      },
    ],
  },
  select: {
    main: {
      name: "Default",
      component: <SelectDemo />,
      file: "components/demos/select-demo.tsx",
    },
  },
  textarea: {
    main: {
      name: "Default",
      component: <TextareaDemo />,
      file: "components/demos/textarea-demo.tsx",
    },
    examples: [
      {
        name: "No Resize",
        description: "Textarea without the resize handle.",
        component: <TextareaNoResize />,
        file: "components/demos/textarea-no-resize.tsx",
      },
    ],
  },
  "number-input": {
    main: {
      name: "Default",
      component: <NumberInputDemo />,
      file: "components/demos/number-input-demo.tsx",
    },
    examples: [
      {
        name: "With Bounds",
        description: "Number input constrained between min and max values.",
        component: <NumberInputBounds />,
        file: "components/demos/number-input-bounds.tsx",
      },
    ],
  },
  "code-block": {
    main: {
      name: "Default",
      component: <CodeBlockMain />,
      file: "components/demos/code-block-main.tsx",
    },
    examples: [
      {
        name: "With Title",
        description: "Code block with a file name title.",
        component: <CodeBlockDemo />,
        file: "components/demos/code-block-demo.tsx",
      },
    ],
  },
  markdown: {
    main: {
      name: "Default",
      component: <MarkdownMain />,
      file: "components/demos/markdown-main.tsx",
    },
    examples: [
      {
        name: "Full Example",
        description: "Markdown with headings, lists, code blocks, images, and tables.",
        component: <MarkdownDemo />,
        file: "components/demos/markdown-demo.tsx",
      },
    ],
  },
  "long-press-button": {
    main: {
      name: "Default",
      component: <LongPressButtonMain />,
      file: "components/demos/long-press-button-main.tsx",
    },
    examples: [
      {
        name: "Styled Icons",
        description: "Long press buttons with custom colors and icon styles.",
        component: <LongPressButtonDemo />,
        file: "components/demos/long-press-button-demo.tsx",
      },
    ],
  },
  "command-prompt": {
    main: {
      name: "Default",
      component: <CommandPromptDemo />,
      file: "components/demos/command-prompt-demo.tsx",
    },
  },
  "invisible-input": {
    main: {
      name: "Default",
      component: <InvisibleInputMain />,
      file: "components/demos/invisible-input-main.tsx",
    },
    examples: [
      {
        name: "Styled",
        description: "Invisible inputs with custom styling applied via className.",
        component: <InvisibleInputDemo />,
        file: "components/demos/invisible-input-demo.tsx",
      },
    ],
  },
  "description-list": {
    main: {
      name: "Default",
      component: <DescriptionListMain />,
      file: "components/demos/description-list-main.tsx",
    },
    examples: [
      {
        name: "Layouts",
        description: "Stacked and default layout options.",
        component: <DescriptionListDemo />,
        file: "components/demos/description-list-demo.tsx",
      },
    ],
  },
  "page-header": {
    main: {
      name: "Default",
      component: <PageHeaderMain />,
      file: "components/demos/page-header-main.tsx",
    },
    examples: [
      {
        name: "With Actions",
        description: "Page header with action buttons.",
        component: <PageHeaderDemo />,
        file: "components/demos/page-header-demo.tsx",
      },
    ],
  },
  window: {
    main: {
      name: "Default",
      component: <WindowDemo />,
      file: "components/demos/window-demo.tsx",
    },
  },
  chat: {
    main: {
      name: "Default",
      component: <ChatDemo />,
      file: "components/demos/chat-demo.tsx",
    },
  },
  "chat-input": {
    main: {
      name: "Default",
      component: <ChatInputDemo />,
      file: "components/demos/chat-input-demo.tsx",
    },
  },
  "chat-message": {
    main: {
      name: "Default",
      component: <ChatMessageMain />,
      file: "components/demos/chat-message-main.tsx",
    },
    examples: [
      {
        name: "With Variant Controls",
        description: "Interactive variant selection for user and assistant message styles.",
        component: <ChatMessageDemo />,
        file: "components/demos/chat-message-demo.tsx",
      },
    ],
  },
  "chat-reasoning": {
    main: {
      name: "Default",
      component: <ChatReasoningDemo />,
      file: "components/demos/chat-reasoning-demo.tsx",
    },
  },
  "chat-tool": {
    main: {
      name: "Default",
      component: <ChatToolMain />,
      file: "components/demos/chat-tool-main.tsx",
    },
    examples: [
      {
        name: "All States",
        description: "Tool call in streaming, processing, completed, and error states.",
        component: <ChatToolDemo />,
        file: "components/demos/chat-tool-demo.tsx",
      },
    ],
  },
  "jsx-preview": {
    main: {
      name: "Default",
      component: <JSXPreviewDemo />,
      file: "components/demos/jsx-preview-demo.tsx",
    },
  },
  pointer: {
    main: {
      name: "Default",
      component: <PointerDemo />,
      file: "components/demos/pointer-demo.tsx",
    },
  },
  reveal: {
    main: {
      name: "Default",
      component: <RevealDemo />,
      file: "components/demos/reveal-demo.tsx",
    },
  },
  "motion-blur-text": {
    main: {
      name: "Default",
      component: <MotionBlurTextDemo />,
      file: "components/demos/motion-blur-text.tsx",
    },
  },
  loader: {
    main: {
      name: "Default",
      component: <LoaderMain />,
      file: "components/demos/loader-main.tsx",
    },
    examples: [
      {
        name: "Shapes",
        description: "All available loader shapes.",
        component: <LoaderShapes />,
        file: "components/demos/loader-shapes.tsx",
      },
      {
        name: "Sizes",
        description: "Loader size presets.",
        component: <LoaderSizes />,
        file: "components/demos/loader-sizes.tsx",
      },
      {
        name: "Styles",
        description: "All visual styles: plain, blur, and dither.",
        component: <LoaderDemo />,
        file: "components/demos/loader-demo.tsx",
      },
    ],
  },
  "morphing-text": {
    main: {
      name: "Default",
      component: <MorphingTextDemo />,
      file: "components/demos/morphing-text-demo.tsx",
    },
  },
  "ascii-wave": {
    main: {
      name: "Default",
      component: <AsciiWaveDemo />,
      file: "components/demos/ascii-wave-demo.tsx",
    },
  },
  "color-picker": {
    main: {
      name: "Default",
      component: <ColorPickerDemo />,
      file: "components/demos/color-picker-demo.tsx",
    },
  },
};

export function getDemoById(id: string): React.ReactNode | null {
  return previewDemoMap[id] ?? null;
}

export function getComponentDemos(id: string): ComponentDemos | null {
  return componentDemosMap[id] ?? null;
}

export function getDemoLayoutById(id: string): ComponentDemoLayout {
  return demoLayoutMap[id] ?? {};
}

export function getComponentMeta(id: string): ComponentMeta | undefined {
  return componentList.find((c) => c.id === id);
}

export function getAllComponentIds(): string[] {
  return componentList.map((c) => c.id);
}
