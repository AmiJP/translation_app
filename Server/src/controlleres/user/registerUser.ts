import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import bcrypt from "bcrypt";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const user = new User();

  const existUser = await AppDataSource.manager.findOne(User, {
    where: {
      email: email,
    },
  });

  if (existUser) {
    return {
      message: "user already registered.",
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  user.name = name;
  user.email = email;
  user.password = hashPassword;
  user.created_date = new Date();
  user.updated_date = new Date();

  const result = await AppDataSource.manager.save(user);

  return {
    message: "user register successfully",
    data: {
      id: result.id,
      name: result.name,
      email: result.email,
    },
  };
}
