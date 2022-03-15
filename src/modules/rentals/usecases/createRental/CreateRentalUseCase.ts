import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { IRequestRentalDTO } from "@modules/cars/dtos/rentals/IRequestRentalDTO";
import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";
import { IRentalRepository } from "@modules/rentals/repositories/rentals/IRentalRepository";
import { ApplicationError } from "@shared/errors/ApplicationError";

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
    expected_return_date,
    car_id,
    user_id,
  }: IRequestRentalDTO): Promise<void> {
    const car = await this.carRepository.findById(car_id);
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new ApplicationError("User not found", 404);

    if (!car) throw new ApplicationError("Car not found", 404);

    this.repository.create({
      start_date: new Date(),
      end_date: new Date(),
      expected_return_date,
      total: 1000,
      car_id,
      user_id,
    });
  }
}

export { CreateRentalUseCase };
