"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
function isAuthenticated(req, res, next) {
    if (!req.session.userId) {
        res.status(401).send({
            message: "failed authentication",
            success: false,
        });
    }
    next();
}
exports.isAuthenticated = isAuthenticated;
