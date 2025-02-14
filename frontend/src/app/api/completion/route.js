import { streamText } from "ai";
import { createOllama } from "ollama-ai-provider";
import { createOpenAI } from "@ai-sdk/openai";
import { experimental_createProviderRegistry as createProviderRegistry } from "ai";
import { Agent } from "https";
import axios from "axios";
import qs from "node:querystring";
import { v4 } from "uuid";

const agent = new Agent({
  rejectUnauthorized: false,
});

const registry = createProviderRegistry({
  ollama: createOllama({
    baseURL: "http://localhost:11434/api",
  }),
  gigachat: createOpenAI({
    baseURL: "https://gigachat.devices.sberbank.ru/api/v1",
    compatibility: "compatible",
    apiKey: process.env.GIGACHAT_ACCESS_TOKEN ?? '',
    fetch: (url, options) => {
      const hasToken =
        process.env.GIGACHAT_ACCESS_TOKEN &&
        process.env.GIGACHAT_EXPIRES_AT != null;
      const hasExpired =
        new Date(process.env.GIGACHAT_EXPIRES_AT) <= new Date();
      if (!hasToken || hasExpired) {
        let auth = process.env.GIGACHAT_AUTH;
        let rquid = v4();

        let data = qs.stringify({
          scope: "GIGACHAT_API_PERS",
        });
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            RqUID: rquid,
            Authorization: `Basic ${auth}`,
          },
          data: data,
          httpsAgent: agent,
        };
        axios(config)
          .then((response) => {
            const json = response.data;
            process.env.GIGACHAT_ACCESS_TOKEN = json.access_token;
            process.env.GIGACHAT_EXPIRES_AT = json.expires_at;
            console.log(JSON.stringify(process.env.GIGACHAT_ACCESS_TOKEN));
          })
          .catch((error) => {
            console.log(error);
          });
      }
      return axios({
        method: "post",
        maxBodyLength: Infinity,
        url: url,
        headers: options.headers,
        httpsAgent: agent,
        data: options.body,
      })
        .then((response) => {
          return new Response(response.data, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            body: response.data,
          });
        })
        .catch((error) => {
          return new Response(error.message, {
            status: error.response.status,
            statusText: error.response.statusText,
            headers: error.response.headers,
            body: error.response.data,
          });
        });
    },
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
