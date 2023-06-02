"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { TextArea } from "@/components/textarea";
import { useState } from "react";

export default function Home() {
  const [context, setContext] = useState("What is love?");
  const [word, setWord] = useState("love");
  return (
    <section className="flex flex-col h-full gap-6">
      <span className="text-center text-bold text-xl">Card Creation</span>
      <label className="flex flex-col">
        Context
        <TextArea
          value={context}
          onChange={({ target: { value } }) => setContext(value)}
        />
      </label>
      <label className="flex flex-col">
        Word
        <Input
          type="text"
          value={word}
          onChange={({ target: { value } }) => setWord(value)}
        />
      </label>
      <label className="flex flex-col">
        Translation
        <Input type="text" value="love" />
      </label>
      <Button>Translate</Button>
      <Button>Add</Button>
    </section>
  );
}
