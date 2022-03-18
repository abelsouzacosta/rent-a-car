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

  async execute({ id, user_id }: IRequestDevolutionRentalDTO): Promise<void> {}
}

export { DevolutionRentalUseCase };
