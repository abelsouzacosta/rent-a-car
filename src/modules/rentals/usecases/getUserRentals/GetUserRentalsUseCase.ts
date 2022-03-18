import { inject } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/rentals/IRentalRepository";
import { ApplicationError } from "@shared/errors/ApplicationError";

class GetUserRentalsUseCase {
  private repository: IRentalRepository;
  private userRepository: IUserRepository;

  constructor(
    @inject("RentalRepository")
    repository: IRentalRepository,
    @inject("UserRepository")
    userRepository: IUserRepository
  ) {
    Object.assign(this, { repository, userRepository });
  }

  async execute(user_id: string): Promise<Rental[]> {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new ApplicationError("User not found", 404);

    const rentals = await this.repository.findRentalsByUserId(user_id);

    return rentals;
  }
}

export { GetUserRentalsUseCase };
