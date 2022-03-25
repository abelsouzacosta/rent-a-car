import { inject, injectable } from "tsyringe";

import { IUpdateUserAvatarDTO } from "@modules/accounts/dtos/IUpdateUserAvatarDTO";
import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { ApplicationError } from "@shared/errors/ApplicationError";

@injectable()
class UpdateUserAvatarUseCase {
  private repository: IUserRepository;
  private storageProvider: IStorageProvider;

  constructor(
    @inject("UserRepository")
    repository: IUserRepository,
    @inject("StorageProvider")
    storageProvider: IStorageProvider
  ) {
    Object.assign(this, { repository, storageProvider });
  }

  async execute({ id, avatar }: IUpdateUserAvatarDTO): Promise<void> {
    const user = await this.repository.findById(id);

    if (!user) throw new ApplicationError("User not found", 404);

    if (user.avatar) await this.storageProvider.delete(user.avatar, "avatar");

    await this.storageProvider.save(avatar, "avatar");

    await this.repository.updateAvatar({ id, avatar });
  }
}

export { UpdateUserAvatarUseCase };
