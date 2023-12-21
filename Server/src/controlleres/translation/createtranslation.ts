import { AppDataSource } from "../../data-source";
import { Translation } from "../../entity/Translation";
import { Message } from "../../types/type";
import { OpenAiClient } from "../../utils/openAiClient";
import { Group } from "../../entity/Group";

const openai = new OpenAiClient();

export async function createTranslation(
  original_text: string,
  language: string,
  groupId: number
) {
  const translation = new Translation();

  const user = await AppDataSource.manager.findOne(Group, {
    where: {
      id: groupId,
    },
  });

  if (!user) {
    throw new Error("user not found");
  }

  let prompt = `Translate following paragraph into ${language} language.Please do not translate json object key.Here is the input json.{"original_text":"${original_text}","target_language":"${language}"}.Please give response only json and in following format.{"translated_text":"translated_text","target_language":"${language}"}.Make sure to escape any quotation marks used within the strings.\`,`;
  const message: Message[] = [
    {
      role: "assistant",
      content: "You are a helpful translator.",
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  const translatedText = await openai.chatCompletion({ message: message });

  if (!translatedText) {
    return null;
  }

  const trans = JSON.parse(translatedText);

  translation.original_text = original_text;
  translation.language = language;
  translation.translated_text = trans.translated_text;
  translation.group = user;

  const result = await AppDataSource.manager.save(translation);
  console.log(result);

  return {
    data: {
      id: result.id,
      original_text: result.original_text,
      language: result.language,
      traslated_text: trans.translated_text,
      groupId: groupId,
    },
    success: true,
  };
}
