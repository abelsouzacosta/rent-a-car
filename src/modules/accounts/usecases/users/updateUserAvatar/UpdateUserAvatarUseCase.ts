import { inject, injectable } from "tsyringe";

import { ApplicationError } from "../../../../../errors/ApplicationError";
import { deleteFile } from "../../../../../utils/file";
import { IUpdateUserAvatarDTO } from "../../../dtos/IUpdateUserAvatarDTO";
import { IUserRepository } from "../../../repositories/users/IUserRepository";

@injectable()
class UpdateUserAvatarUseCase {
  private repository: IUserRepository;

  constructor(
    @inject("UserRepository")
    repository: IUserRepository
  ) {
    Object.assign(this, { repository });
  }

  async execute({ id, avatar }: IUpdateUserAvatarDTO): Promise<void> {
    const user = await this.repository.findById(id);

    if (!user) throw new ApplicationError("User not found", 404);

    if (user.avatar) await deleteFile(`./tmp/avatar/${user.avatar}`);

    await this.repository.updateAvatar({ id, avatar });
  }
}

export { UpdateUserAvatarUseCase };
