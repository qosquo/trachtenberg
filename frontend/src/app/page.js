"use client";

import { useRef, useState } from "react";
import ModelCompletion from "@/components/ModelCompletion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [input, setInput] = useState("Теща");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    let index = 0;

    const completeRefs = () => {
      if (index < refs.length) {
        const ref = refs[index];
        if (ref.current) {
          ref.current.complete(input);
        }
        index++;
        setTimeout(completeRefs, 250);
      }
    };

    completeRefs();
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 10000);
  };

  return (
    <div className="flex flex-col items-center my-10 justify-center h-screen">
      <h2 className="scroll-m-20 text-center mx-5 mb-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
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
          <Button className="mx-2 mb-4" disabled={isButtonDisabled || input === ""} type="submit">
            Отправить
          </Button>
        </form>
        <div className="grid grid-cols-2">
          <ModelCompletion ref={refs[0]} provider="openai" model="gpt-3.5-turbo" />
          <ModelCompletion ref={refs[1]} provider="openai" model="gpt-4o-mini" />
          <ModelCompletion ref={refs[2]} provider="deepseek" model="deepseek-chat" />
          <ModelCompletion ref={refs[3]} provider="google" model="gemini-2.0-flash" />
        </div>
      </div>
    </div>
  );
}
