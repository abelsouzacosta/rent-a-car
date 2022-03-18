import { inject } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { IRentalRepository } from "@modules/rentals/repositories/rentals/IRentalRepository";

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

  async execute(user_id: string): Promise<Rental[]> {}
}

export { GetUserRentalsUseCase };
