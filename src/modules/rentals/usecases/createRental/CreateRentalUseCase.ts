import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";
import { IRequestRentalDTO } from "@modules/rentals/dtos/rentals/IRequestRentalDTO";
import { IRentalRepository } from "@modules/rentals/repositories/rentals/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ApplicationError } from "@shared/errors/ApplicationError";

dayjs.extend(utc);

@injectable()
class CreateRentalUseCase {
  private repository: IRentalRepository;
  private userRepository: IUserRepository;
  private carRepository: ICarRepository;
  private dateProvider: IDateProvider;

  constructor(
    @inject("RentalRepository")
    repository: IRentalRepository,
    @inject("UserRepository")
    userRepository: IUserRepository,
    @inject("CarRepository")
    carRepository: ICarRepository,
    @inject("DateProvider")
    dateProvider: IDateProvider
  ) {
    Object.assign(this, {
      repository,
      userRepository,
      carRepository,
      dateProvider,
    });
  }

  async execute({
    expected_return_date,
    car_id,
    user_id,
  }: IRequestRentalDTO): Promise<void> {
    const car = await this.carRepository.findById(car_id);
    const user = await this.userRepository.findById(user_id);
    const minimalRentalHoursLength = 24;

    if (!user) throw new ApplicationError("User not found", 404);

    if (!car) throw new ApplicationError("Car not found", 404);

    if (!car.avaliable)
      throw new ApplicationError("Car is not available for rent", 409);

    const userHasAnAlreadyOpenRentalOperation =
      await this.repository.findRentalByUserId(user_id);

    if (
      userHasAnAlreadyOpenRentalOperation &&
      !userHasAnAlreadyOpenRentalOperation.end_date
    )
      throw new ApplicationError(
        "User has an already open rental operation",
        409
      );

    const dateNow = this.dateProvider.dateNow();

    const hourComparation = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (hourComparation < minimalRentalHoursLength)
      throw new ApplicationError("24 hours rental length required", 400);

    await this.carRepository.rentCarWithPlate(car.license_plate);

    this.repository.create({
      start_date: dateNow,
      expected_return_date,
      car_id,
      user_id,
    });
  }
}

export { CreateRentalUseCase };
