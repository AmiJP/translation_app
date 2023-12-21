"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const Group_1 = require("./entity/Group");
const Translation_1 = require("./entity/Translation");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Ami@9978225367",
    database: "translation_app",
    synchronize: true,
    logging: true,
    entities: [User_1.User, Group_1.Group, Translation_1.Translation],
    subscribers: [],
    migrations: [],
});
