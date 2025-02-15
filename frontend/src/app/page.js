"use client";

import { useRef, useState } from "react";
import ModelCompletion from "@/components/ModelCompletion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="scroll-m-20 mx-5 mb-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      ЛЛМ арена имени Р. Трахтенберга
    </h2>
      <div className="sm:w-1/2 mx-5">
        <Label className="font-bold" htmlFor="input">
          Тема анекдота
        </Label>
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
          <Button className="mx-2 mb-4" disabled={input === ""} type="submit">
            Отправить
          </Button>
        </form>
        <div className="grid grid-cols-2">
          <ModelCompletion ref={refs[0]} provider="gigachat" model="GigaChat" />
        </div>
      </div>
    </div>
  );
}
