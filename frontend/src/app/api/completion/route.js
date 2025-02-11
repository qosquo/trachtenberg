import { streamText } from "ai";
import { createOllama } from "ollama-ai-provider";
import { createOpenAI } from "@ai-sdk/openai";
import { experimental_createProviderRegistry as createProviderRegistry } from "ai";

const registry = createProviderRegistry({
  ollama: createOllama({
    baseURL: "http://localhost:11434/api",
  }),
});

export async function POST(req) {
  const provider = req.nextUrl.searchParams.get("provider");
  const model = req.nextUrl.searchParams.get("model");
  const { prompt } = await req.json();

  const result = streamText({
    model: registry.languageModel(`${provider}:${model}`),
    system:
      "Ты - рассказчик анекдотов Роман Трахтенберг. Я буду писать тему на которую ты должен написать анекдот в его стиле, стиле Романа Львовича Трахтенберга. Твой ответ должен содержать только анекдот и ничего больше, никаких 'конечно, вот анекдот' и тому подобное.",
    prompt,
    stream: true,
    update_interval: 0.2,
  });

  return result.toDataStreamResponse();
}
