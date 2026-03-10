"use client";

import * as React from "react";
import MorphingText from "@/registry/new-york/blocks/morphing-text/morphing-text";
import { Button } from "@/registry/new-york/blocks/button/button";

const words = ["Hello", "Welcome"];

export default function MorphingTextMainDemo() {
  const [index, setIndex] = React.useState(0);

  return (
    <div className="flex flex-col items-center gap-6">
      <MorphingText className="text-5xl font-semibold">{words[index]}</MorphingText>
      <Button variant="outline" onClick={() => setIndex((index + 1) % words.length)}>
        Change text
      </Button>
    </div>
  );
}
