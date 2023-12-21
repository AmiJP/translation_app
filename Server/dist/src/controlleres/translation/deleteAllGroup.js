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
exports.deleteallGroup = void 0;
const data_source_1 = require("../../data-source");
const Group_1 = require("../../entity/Group");
function deleteallGroup() {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteAllGroup = yield data_source_1.AppDataSource.manager.find(Group_1.Group);
        yield data_source_1.AppDataSource.manager.remove(deleteAllGroup);
        return {
            message: "all group delete successfully",
        };
    });
}
exports.deleteallGroup = deleteallGroup;
