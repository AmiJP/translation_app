import { AppDataSource } from "../../data-source";
import { Group } from "../../entity/Group";

export async function getGroup(userId: number) {
  const groupRepository = AppDataSource.getRepository(Group);

  const getGroup = await groupRepository.findBy({
    user: {
      id: userId,
    },
  });

  if (!getGroup) {
    return {
      message: "group not found",
    };
  }

  return getGroup;
}
