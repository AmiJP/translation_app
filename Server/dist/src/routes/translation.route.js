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
exports.groupRouter = void 0;
const express_1 = __importDefault(require("express"));
const createGroup_1 = require("../controlleres/translation/createGroup");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const deleteGroup_1 = require("../controlleres/translation/deleteGroup");
const getGroup_1 = require("../controlleres/translation/getGroup");
const createtranslation_1 = require("../controlleres/translation/createtranslation");
const getTranslation_1 = require("../controlleres/translation/getTranslation");
const deleteAllGroup_1 = require("../controlleres/translation/deleteAllGroup");
const router = express_1.default.Router();
exports.groupRouter = router;
router.post("/", isAuthenticated_1.isAuthenticated, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.session.userId;
        const result = yield (0, createGroup_1.createGroup)(userId);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/:id", isAuthenticated_1.isAuthenticated, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.session.userId;
        const groupId = Number(req.params.id);
        const result = yield (0, deleteGroup_1.deleteGroup)(groupId, userId);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/", isAuthenticated_1.isAuthenticated, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.session.userId;
        const result = yield (0, getGroup_1.getGroup)(userId);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/:id", isAuthenticated_1.isAuthenticated, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupId = Number(req.params.id);
        const { original_text, language } = req.body;
        const result = yield (0, createtranslation_1.createTranslation)(original_text, language, groupId);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:id", isAuthenticated_1.isAuthenticated, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupId = Number(req.params.id);
        const result = yield (0, getTranslation_1.getTranslation)(groupId);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/", isAuthenticated_1.isAuthenticated, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, deleteAllGroup_1.deleteallGroup)();
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}));
