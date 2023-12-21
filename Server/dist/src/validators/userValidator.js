"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserValidator = exports.registerUserValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerUserValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("name is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("please enter valid email"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 4 })
        .withMessage("password must be 4 character long"),
];
exports.loginUserValidator = [
    (0, express_validator_1.body)("email").isEmail().withMessage("please enter valid email"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 4 })
        .withMessage("password must be 4 character long"),
];
