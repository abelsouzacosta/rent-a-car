import { inject } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";
import { IRequestDevolutionRentalDTO } from "@modules/rentals/dtos/rentals/IRequestDevolutionRentalDTO";
import { IRentalRepository } from "@modules/rentals/repositories/rentals/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ApplicationError } from "@shared/errors/ApplicationError";

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

  async execute({ id, user_id }: IRequestDevolutionRentalDTO): Promise<void> {
    const rental = await this.repository.findById(id);
    const foundRentalByUser = await this.repository.findRentalByUserId(user_id);

    if (!rental) throw new ApplicationError("Rental not found", 404);

    if (!foundRentalByUser)
      throw new ApplicationError("There's not renal for the user", 404);

    if (rental.user_id !== foundRentalByUser.user_id)
      throw new ApplicationError(
        "The user cannot do a devolution that does not belongs to them",
        401
      );

    this.repository.doDevolution({
      id,
      end_date: new Date(),
      total: 0,
    });
  }
}

export { DevolutionRentalUseCase };
