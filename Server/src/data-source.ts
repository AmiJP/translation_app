import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Group } from "./entity/Group";
import { Translation } from "./entity/Translation";

export let AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "your password",
  database: "translation_app",
  synchronize: true,
  logging: true,
  entities: [User, Group, Translation],
  subscribers: [],
  migrations: [],
});
