import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { ICreateRentalDTO } from "@modules/cars/dtos/rentals/ICreateRentalDTO";
import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";
import { IRentalRepository } from "@modules/rentals/repositories/rentals/IRentalRepository";

@injectable()
class CreateRentalUseCase {
  private repository: IRentalRepository;
  private userRepository: IUserRepository;
  private carRepository: ICarRepository;

  constructor(
    @inject("RentalRepository")
    repository: IRentalRepository,
    @inject("UserRepository")
    userRepository: IUserRepository,
    @inject("CarRepository")
    carRepository: ICarRepository
  ) {
    Object.assign(this, { repository, userRepository, carRepository });
  }

  async execute({
    start_date,
    end_date,
    expected_return_date,
    total,
    car_id,
    user_id,
  }: ICreateRentalDTO): Promise<void> {
    this.repository.create({
      start_date,
      end_date,
      expected_return_date,
      total,
      car_id,
      user_id,
    });
  }
}

export { CreateRentalUseCase };
