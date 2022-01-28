import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { ApplicationError } from "src/errors/ApplicationError";
import { inject, injectable } from "tsyringe";

interface IUpdateUserAvatarDTO {
  id: string;
  avatar: string;
}

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

    await this.repository.updateAvatar({ id, avatar });
  }
}

export { UpdateUserAvatarUseCase };