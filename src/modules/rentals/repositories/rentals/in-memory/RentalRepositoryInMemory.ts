import { IRequestRentalDTO } from "@modules/rentals/dtos/rentals/IRequestRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalRepository } from "../IRentalRepository";

class RentalRepositoryInMemory implements IRentalRepository {
  private rentals: Rental[];

  constructor() {
    this.rentals = [];
  }

  async findById(id: string): Promise<Rental | undefined> {
    const rental = this.rentals.find((rent) => rent.id === id);

    return rental;
  }

  async findRentalByUserId(user_id: string): Promise<Rental | undefined> {
    const rental = this.rentals.find((rent) => rent.user_id === user_id);

    return rental;
  }

  async list(): Promise<Rental[]> {
    return this.rentals;
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: IRequestRentalDTO): Promise<void> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
    });

    this.rentals.push(rental);
  }
}

export { RentalRepositoryInMemory };
