import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { IRequestRentalDTO } from "@modules/cars/dtos/rentals/IRequestRentalDTO";
import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";
import { IRentalRepository } from "@modules/rentals/repositories/rentals/IRentalRepository";
import { ApplicationError } from "@shared/errors/ApplicationError";

dayjs.extend(utc);

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
    const minimalRentalHOursLength = 24;

    if (!user) throw new ApplicationError("User not found", 404);

    if (!car) throw new ApplicationError("Car not found", 404);

    if (!car.avaliable)
      throw new ApplicationError("Car is not available for rent", 409);

    const userHasAnAlreadyOpenRentalOperation =
      await this.repository.findRentalByUserId(user_id);

    if (userHasAnAlreadyOpenRentalOperation)
      throw new ApplicationError(
        "User has an already open rental operation",
        409
      );

    const dateNow = new Date();

    const dateNowFormated = dayjs(dateNow).utc().local().format();

    const expectedReturnDateFormated = dayjs(expected_return_date)
      .utc()
      .local()
      .format();

    const hourComparation = dayjs(expectedReturnDateFormated).diff(
      dateNowFormated,
      "hours"
    );

    if (hourComparation < 24)
      throw new ApplicationError("24 hours rental length required", 400);

    await this.carRepository.rentCarWithPlate(car.license_plate);

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
