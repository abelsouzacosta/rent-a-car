import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";
import { IRequestDevolutionRentalDTO } from "@modules/rentals/dtos/rentals/IRequestDevolutionRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/rentals/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ApplicationError } from "@shared/errors/ApplicationError";

@injectable()
class DevolutionRentalUseCase {
  private repository: IRentalRepository;
  private carRepository: ICarRepository;
  private dateProvider: IDateProvider;

  constructor(
    @inject("RentalRepository")
    repository: IRentalRepository,
    @inject("CarRepository")
    carRepository: ICarRepository,
    @inject("DateProvider")
    dateProvider: IDateProvider
  ) {
    Object.assign(this, { repository, carRepository, dateProvider });
  }

  async execute({ id, user_id }: IRequestDevolutionRentalDTO): Promise<Rental> {
    const rental = await this.repository.findById(id);
    const foundRentalByUser = await this.repository.findRentalByUserId(user_id);
    const minimalDaily = 1;

    if (!rental) throw new ApplicationError("Rental not found", 404);

    const rentedCar = await this.carRepository.findById(rental.car_id);

    if (!foundRentalByUser)
      throw new ApplicationError("There's not renal for the user", 404);

    if (rental.user_id !== foundRentalByUser.user_id)
      throw new ApplicationError(
        "The user cannot do a devolution that does not belongs to them",
        401
      );

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily <= 0) daily = minimalDaily;

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    const totalFine = delay > 1 ? delay * rentedCar.fine_amount : 0;

    const totalDaily = daily * rentedCar.daily_rate;

    const total = totalDaily + totalFine;

    await this.carRepository.returnCarWithId(rentedCar.id);

    await this.repository.doDevolution({
      id,
      end_date: dateNow,
      total,
    });

    const updatedRental = await this.repository.findById(rental.id);

    return updatedRental;
  }
}

export { DevolutionRentalUseCase };
