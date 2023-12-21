import OpenAI from "openai";
import { Message } from "../types/type";

export class OpenAiClient {
  private openai: OpenAI;
  private model: string;

  constructor() {
    this.openai = new OpenAI({
      apiKey: "your openAi key",
    });
    this.model = "your model";
  }

  async chatCompletion({ message }: { message: Message[] }) {
    const completion = await this.openai.chat.completions.create({
      messages: message,
      model: this.model,
    });

    const result = completion.choices[0].message.content;

    return result;
  }
}
