import { inject } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";
import { IRequestDevolutionRentalDTO } from "@modules/rentals/dtos/rentals/IRequestDevolutionRentalDTO";
import { IRentalRepository } from "@modules/rentals/repositories/rentals/IRentalRepository";
import { ApplicationError } from "@shared/errors/ApplicationError";

class DevolutionRentalUseCase {
  private repository: IRentalRepository;
  private carRepository: ICarRepository;

  constructor(
    @inject("RentalRepository")
    repository: IRentalRepository,
    @inject("CarRepository")
    carRepository: ICarRepository
  ) {
    Object.assign(this, { repository, carRepository });
  }

  async execute({ id, user_id }: IRequestDevolutionRentalDTO): Promise<void> {
    const rental = await this.repository.findById(id);
    const foundRentalByUser = await this.repository.findRentalByUserId(user_id);

    if (!rental) throw new ApplicationError("Rental not found", 404);

    if (!foundRentalByUser)
      throw new ApplicationError("There's not renal for the user", 404);
  }
}

export { DevolutionRentalUseCase };
