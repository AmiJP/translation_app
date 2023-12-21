import { User } from "../../entity/User";
import { AppDataSource } from "../../data-source";

export async function getAccount(id: number | undefined) {
  const result = await AppDataSource.manager.findOne(User, {
    where: {
      id: id,
    },
  });

  if (!result) {
    return null;
  }
  return {
    id: result.id,
    name: result.name,
    email: result.email,
  };
}
