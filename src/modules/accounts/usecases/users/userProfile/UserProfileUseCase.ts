import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { ApplicationError } from "@shared/errors/ApplicationError";

@injectable()
class UserProfileUseCase {
  private repository: IUserRepository;

  constructor(
    @inject("UserRepository")
    repository: IUserRepository
  ) {
    Object.assign(this, { repository });
  }

  async execute(id: string): Promise<User> {
    const user = await this.repository.findById(id);

    if (!user) throw new ApplicationError("User not found", 404);

    return user;
  }
}

export { UserProfileUseCase };
