import Constants from "@/data/Constants";
import { NextRequest } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_AI_MODEL_GEMINI_KEY,
});
export async function POST(req: NextRequest) {
  const { description, model, imageUrl } = await req.json();
  const modelObj = Constants.AiModelList.find((item) => item.name == model);
  const modelName = modelObj?.modelName;
  console.log(modelName);
  const response = await openai.chat.completions.create({
    model: modelName ?? "google/gemini-2.0-pro-exp-02-05:free",
    stream: true,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: description,
          },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
  });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const text = chunk.choices?.[0]?.delta?.content || "";
        controller.enqueue(new TextEncoder().encode(text));
      }
      controller.close();
    },
  });

  return new Response(stream,{
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    }
  });    
}
