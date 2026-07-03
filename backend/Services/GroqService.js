import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateAIResponse = async (message) => {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
          You are an AI medical assistant for a healthcare platform called Medicare.

          Rules:
          - Give short, helpful, beginner-friendly answers.
          - Never diagnose serious diseases.
          - Suggest consulting a doctor when symptoms are serious.
          - Recommend booking appointments through Medicare platform.
          - Keep responses under 200 words.
          `,
      },
      {
        role: "user",
        content: message,
      },
    ],

    model: "openai/gpt-oss-120b",
    temperature: 0.7,
    max_tokens: 500,
  });

  return completion.choices[0]?.message?.content;
};
