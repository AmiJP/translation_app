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
exports.createGroup = void 0;
const data_source_1 = require("../../data-source");
const Group_1 = require("../../entity/Group");
const User_1 = require("../../entity/User");
function createGroup(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const group = new Group_1.Group();
        const user = yield data_source_1.AppDataSource.manager.findOne(User_1.User, {
            where: {
                id: user_id,
            },
        });
        console.log(user);
        if (!user) {
            throw new Error("user not found");
        }
        group.user = user;
        const result = yield data_source_1.AppDataSource.manager.save(group);
        return {
            message: "create group successfully.",
            id: result.id,
        };
    });
}
exports.createGroup = createGroup;
