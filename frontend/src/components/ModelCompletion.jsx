import React, { forwardRef, useState, useRef } from "react";
import { useCompletion } from "ai/react";

const ModelCompletion = forwardRef(({ provider, model }, ref) => {
  const [match, setMatch] = useState(null);
  const { completion, complete } = useCompletion({
    api: `/api/completion?provider=${provider}&model=${model}`,
    onFinish: async (prompt, completion) => {
      try {
        const data = await fetch("http://localhost:8000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: completion,
          }),
        });

        const res = await data.json();
        setMatch(res.prediction);
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (ref) {
    ref.current = {
      complete,
    };
  }

  return (
    <div>
      <div>{model}</div>
      {completion}
      <div>Совпадение: {(match * 100)?.toFixed(2) ?? 0}%</div>
    </div>
  );
});

export default ModelCompletion;
