import { AppDataSource } from "../../data-source";
import { Group } from "../../entity/Group";

export async function deleteGroup(groupId: number, userId: number) {
  const groupRepository = AppDataSource.getRepository(Group);

  const groupRemove = await groupRepository.findOneBy({
    id: groupId,
    user: {
      id: userId,
    },
  });

  if (!groupRemove) {
    return {
      message: "group not found",
      data: null,
    };
  }
  await groupRepository.delete(groupRemove);

  return {
    message: "group delete successfully.",
    id: groupId,
  };
}
