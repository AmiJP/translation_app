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
exports.transGroup = void 0;
const express_1 = __importDefault(require("express"));
const createGroup_1 = require("../controlleres/trans/createGroup");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const router = express_1.default.Router();
exports.transGroup = router;
router.post("/createGroup", isAuthenticated_1.isAuthenticated, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.session.userId;
        const result = yield (0, createGroup_1.createGroup)(userId);
        console.log(userId);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}));
