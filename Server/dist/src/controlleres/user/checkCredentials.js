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
exports.checkCredentials = void 0;
const data_source_1 = require("../../data-source");
const User_1 = require("../../entity/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
function checkCredentials(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield data_source_1.AppDataSource.manager.findOne(User_1.User, {
            where: {
                email: email,
            },
        });
        if (!result) {
            return null;
        }
        const match = yield bcrypt_1.default.compare(password, result.password);
        if (!match) {
            return {
                message: "wrong email or password.",
            };
        }
        return {
            message: "Login successfully done",
            data: {
                id: result.id,
                name: result.name,
                email: result.email,
                created_date: result.created_date,
                updated_date: result.updated_date,
            },
        };
    });
}
exports.checkCredentials = checkCredentials;
