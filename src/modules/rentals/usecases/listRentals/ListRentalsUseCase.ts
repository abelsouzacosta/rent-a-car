import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/rentals/IRentalRepository";

@injectable()
class ListRentalsUseCase {
  private repository: IRentalRepository;

  constructor(
    @inject("RentalRepository")
    repository: IRentalRepository
  ) {
    Object.assign(this, { repository });
  }

  async execute(): Promise<Rental[]> {
    const rentals = await this.repository.list();

    return rentals;
  }
}

export { ListRentalsUseCase };
