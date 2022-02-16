import { inject, injectable } from "tsyringe";

import { ApplicationError } from "@errors/ApplicationError";
import { IUpdateUserAvatarDTO } from "@modules/accounts/dtos/IUpdateUserAvatarDTO";
import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { deleteFile } from "@utils/file";

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
