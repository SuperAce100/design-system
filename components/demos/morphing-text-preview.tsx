"use client";

import * as React from "react";
import MorphingText from "@/registry/new-york/blocks/morphing-text/morphing-text";

const words = ["hello", "hey there", "greetings"];

export default function MorphingTextPreview() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <MorphingText className="text-4xl font-semibold">{words[index]}</MorphingText>
    </div>
  );
}
