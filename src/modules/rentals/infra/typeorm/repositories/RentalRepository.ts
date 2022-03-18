import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/rentals/ICreateRentalDTO";
import { IDevolutionRentalDTO } from "@modules/rentals/dtos/rentals/IDevolutionRentalDTO";
import { IRentalRepository } from "@modules/rentals/repositories/rentals/IRentalRepository";

import { Rental } from "../entities/Rental";

class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        id,
      },
    });

    return rental;
  }

  async findRentalByUserId(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        user_id,
      },
    });

    return rental;
  }

  async list(): Promise<Rental[]> {
    const rentals = await this.repository.find();

    return rentals;
  }

  async create({
    start_date,
    end_date,
    expected_return_date,
    total,
    car_id,
    user_id,
  }: ICreateRentalDTO): Promise<void> {
    const rental = this.repository.create({
      start_date,
      end_date,
      expected_return_date,
      total,
      car_id,
      user_id,
    });

    await this.repository.save(rental);
  }

  async makeDevolution({
    id,
    end_date,
    total,
  }: IDevolutionRentalDTO): Promise<void> {
    const rental = await this.findById(id);

    rental.end_date = end_date;
    rental.total = total;

    await this.repository.save(rental);
  }
}

export { RentalRepository };
