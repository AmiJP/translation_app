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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const registerUser_1 = require("../controlleres/user/registerUser");
const userValidator_1 = require("../validators/userValidator");
const express_validator_1 = require("express-validator");
const checkCredentials_1 = require("../controlleres/user/checkCredentials");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const getAccount_1 = require("../controlleres/user/getAccount");
const router = express_1.default.Router();
exports.userRouter = router;
router.post("/register", userValidator_1.registerUserValidator, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            return res.status(400).send({
                message: "validation error",
                error: { errors: error.array() },
            });
        }
        const result = yield (0, registerUser_1.registerUser)(name, email, password);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/login", userValidator_1.loginUserValidator, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = req.body;
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            return res.status(400).send({
                message: "validation error",
                error: { errors: error.array() },
            });
        }
        const user = yield (0, checkCredentials_1.checkCredentials)(email, password);
        if (!user) {
            return res.status(400).send({
                message: "Invalid credentials.",
            });
        }
        req.session.userId = (_a = user.data) === null || _a === void 0 ? void 0 : _a.id;
        res.send(user);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/logout", isAuthenticated_1.isAuthenticated, (req, res) => {
    req.session.userId = undefined;
    res.send({
        message: "Logout successfully.",
        success: true,
    });
});
router.get("/account", isAuthenticated_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, getAccount_1.getAccount)(req.session.userId);
    res.send(result);
}));
