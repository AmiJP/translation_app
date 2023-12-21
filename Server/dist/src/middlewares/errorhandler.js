"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorhandler = void 0;
function errorhandler(req, res, next, err) {
    res.status(500).send({
        message: err.message,
        success: false,
    });
}
exports.errorhandler = errorhandler;
