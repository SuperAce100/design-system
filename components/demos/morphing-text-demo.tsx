"use client";

import * as React from "react";
import MorphingText from "@/registry/new-york/blocks/morphing-text/morphing-text";
import { Button } from "@/components/ui/button";

const words = ["hi", "hello", "hey there", "greetings", "hi"];

export default function MorphingTextDemo() {
  const [index, setIndex] = React.useState(0);

  const cycleWord = () => {
    setIndex((prev) => (prev + 1) % words.length);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="text-center">
        <MorphingText className="text-5xl font-semibold">{words[index]}</MorphingText>
      </div>
      <Button onClick={cycleWord} variant="outline">
        Change Word
      </Button>
    </div>
  );
}
