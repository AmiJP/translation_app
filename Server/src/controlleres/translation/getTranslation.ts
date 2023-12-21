import { AppDataSource } from "../../data-source";
import { Translation } from "../../entity/Translation";

export async function getTranslation(groupId: number) {
  const transRepository = AppDataSource.getRepository(Translation);

  const translation = await transRepository.findBy({
    group: {
      id: groupId,
    },
  });

  return translation;
}
