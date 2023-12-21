import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import bcrypt from "bcrypt";

export async function checkCredentials(email: string, password: string) {
  const result = await AppDataSource.manager.findOne(User, {
    where: {
      email: email,
    },
  });

  if (!result) {
    return null;
  }

  const match = await bcrypt.compare(password, result.password);

  if (!match) {
    return {
      message: "wrong email or password.",
    };
  }
  return {
    message: "Login successfully done",
    data: {
      id: result.id,
      name: result.name,
      email: result.email,
      created_date: result.created_date,
      updated_date: result.updated_date,
    },
  };
}
