import { AppDataSource } from "../../data-source";
import { Group } from "../../entity/Group";

export async function deleteallGroup() {
  const deleteAllGroup = await AppDataSource.manager.find(Group);

  await AppDataSource.manager.remove(deleteAllGroup);

  return {
    message: "all group delete successfully",
  };
}
