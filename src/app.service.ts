import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getReply(prompt: string) {
    const key = process.env.GEMINI_API;
    const MODEL_NAME = 'gemini-pro';
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const parts = [
      {
        text: prompt,
      },
    ];

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    try {
      const result = await model.generateContent({
        contents: [{ role: 'user', parts }],
        generationConfig,
      });

      const reply = result.response.text();

      return reply;
    } catch (error) {
      throw error;
    }
  }
}
