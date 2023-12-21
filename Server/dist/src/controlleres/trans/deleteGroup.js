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
exports.deleteGroup = void 0;
const data_source_1 = require("../../data-source");
const Group_1 = require("../../entity/Group");
function deleteGroup(groupId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const groupRepository = data_source_1.AppDataSource.getRepository(Group_1.Group);
        const groupRemove = yield groupRepository.findOneBy({
            id: groupId,
            user: {
                id: userId,
            },
        });
        if (!groupRemove) {
            return {
                message: "group not found",
                data: null,
            };
        }
        yield groupRepository.delete(groupRemove);
        return {
            message: "group delete successfully.",
            id: groupId,
        };
    });
}
exports.deleteGroup = deleteGroup;
