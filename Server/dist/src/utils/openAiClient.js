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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiClient = void 0;
const openai_1 = __importDefault(require("openai"));
class OpenAiClient {
    constructor() {
        this.openai = new openai_1.default({
            apiKey: "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",
        });
        this.model = "gpt-3.5-turbo-1106";
    }
    chatCompletion({ message }) {
        return __awaiter(this, void 0, void 0, function* () {
            const completion = yield this.openai.chat.completions.create({
                messages: message,
                model: this.model,
            });
            const result = completion.choices[0].message.content;
            return result;
        });
    }
}
exports.OpenAiClient = OpenAiClient;
