import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMapper } from "@modules/accounts/mappers/UserMapper";
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

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.repository.findById(id);

    if (!user) throw new ApplicationError("User not found", 404);

    return UserMapper.toDTO(user);
  }
}

export { UserProfileUseCase };
