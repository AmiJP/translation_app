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
exports.getAccount = void 0;
const User_1 = require("../../entity/User");
const data_source_1 = require("../../data-source");
function getAccount(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield data_source_1.AppDataSource.manager.findOne(User_1.User, {
            where: {
                id: id,
            },
        });
        if (!result) {
            return null;
        }
        return {
            id: result.id,
            name: result.name,
            email: result.email,
        };
    });
}
exports.getAccount = getAccount;
