import { ICreateRentalDTO } from "@modules/cars/dtos/rentals/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalRepository } from "../IRentalRepository";

class RentalRepositoryInMemory implements IRentalRepository {
  private rentals: Rental[];

  constructor() {
    this.rentals = [];
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rent) => rent.id === id);

    return rental;
  }

  async create({
    start_date,
    end_date,
    expected_return_date,
    total,
    car_id,
    user_id,
  }: ICreateRentalDTO): Promise<void> {
    const rental = new Rental();

    Object.assign(rental, {
      start_date,
      end_date,
      expected_return_date,
      total,
      car_id,
      user_id,
    });

    this.rentals.push(rental);
  }
}

export { RentalRepositoryInMemory };
