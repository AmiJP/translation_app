"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const data_source_1 = require("./src/data-source");
const morgan_1 = __importDefault(require("morgan"));
const user_route_1 = require("./src/routes/user.route");
const express_session_1 = __importDefault(require("express-session"));
const translation_route_1 = require("./src/routes/translation.route");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("database connected.");
})
    .catch((error) => console.log(error));
app.use((0, express_session_1.default)({
    secret: "ami",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
app.use("/user", user_route_1.userRouter);
app.use("/group", translation_route_1.groupRouter);
app.listen(4000, () => {
    console.log("server running on port 4000.");
});
