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
exports.registerUser = void 0;
const data_source_1 = require("../../data-source");
const User_1 = require("../../entity/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
function registerUser(name, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new User_1.User();
        const existUser = yield data_source_1.AppDataSource.manager.findOne(User_1.User, {
            where: {
                email: email,
            },
        });
        if (existUser) {
            return {
                message: "user already registered.",
            };
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        user.name = name;
        user.email = email;
        user.password = hashPassword;
        user.created_date = new Date();
        user.updated_date = new Date();
        const result = yield data_source_1.AppDataSource.manager.save(user);
        return {
            message: "user register successfully",
            data: {
                id: result.id,
                name: result.name,
                email: result.email,
            },
        };
    });
}
exports.registerUser = registerUser;
