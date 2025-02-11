"use client";

import { useRef, useState } from "react";
import ModelCompletion from "@/components/ModelCompletion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [input, setInput] = useState("Теща");
  const refs = [useRef(null), useRef(null)];

  const handleSubmit = (event) => {
    event.preventDefault();
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current.complete(input);
      }
    });
  };

  return (
    <div
      style={{
        width: "50rem",
        margin: "1rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 1fr",
        }}
      >
        <Input
          value={input}
          // disabled={true}
          onChange={(e) => setInput(e.target.value)}
          id="input"
          placeholder="Введите тему анекдота"
        />
        <Button style={{ margin: "0 1rem" }} type="submit">
          Отправить
        </Button>
      </form>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <ModelCompletion
          ref={refs[0]}
          provider="ollama"
          model="qwen2.5:1.5b"
        />
      </div>
    </div>
  );
}
