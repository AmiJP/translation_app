import { AppDataSource } from "../../data-source";
import { Group } from "../../entity/Group";
import { User } from "../../entity/User";

export async function createGroup(user_id: number) {
  const group = new Group();

  const user = await AppDataSource.manager.findOne(User, {
    where: {
      id: user_id,
    },
  });
  console.log(user);
  if (!user) {
    throw new Error("user not found");
  }

  group.user = user;

  const result = await AppDataSource.manager.save(group);

  return {
    message: "create group successfully.",
    id: result.id,
  };
}
