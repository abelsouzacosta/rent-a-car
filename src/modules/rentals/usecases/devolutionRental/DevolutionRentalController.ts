import { inject } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";
import { IRentalRepository } from "@modules/rentals/repositories/rentals/IRentalRepository";

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
}

export { DevolutionRentalUseCase };
