"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTranslation = void 0;
const data_source_1 = require("../../data-source");
const Translation_1 = require("../../entity/Translation");
const openAiClient_1 = require("../../utils/openAiClient");
const Group_1 = require("../../entity/Group");
const openai = new openAiClient_1.OpenAiClient();
function createTranslation(original_text, language, groupId) {
    return __awaiter(this, void 0, void 0, function* () {
        const translation = new Translation_1.Translation();
        const user = yield data_source_1.AppDataSource.manager.findOne(Group_1.Group, {
            where: {
                id: groupId,
            },
        });
        if (!user) {
            throw new Error("user not found");
        }
        let prompt = `Translate following paragraph into ${language} language.Please do not translate json object key.Here is the input json.{"original_text":"${original_text}","target_language":"${language}"}.Please give response only json and in following format.{"translated_text":"translated_text","target_language":"${language}"}.Make sure to escape any quotation marks used within the strings.\`,`;
        const message = [
            {
                role: "assistant",
                content: "You are a helpful translator.",
            },
            {
                role: "user",
                content: prompt,
            },
        ];
        const translatedText = yield openai.chatCompletion({ message: message });
        if (!translatedText) {
            return null;
        }
        const trans = JSON.parse(translatedText);
        translation.original_text = original_text;
        translation.language = language;
        translation.translated_text = trans.translated_text;
        translation.group = user;
        const result = yield data_source_1.AppDataSource.manager.save(translation);
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
    });
}
exports.createTranslation = createTranslation;
