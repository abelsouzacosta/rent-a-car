import { inject } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";

class ListCarsUseCase {
  private repository: ICarRepository;

  constructor(
    @inject("CarRepository")
    repository: ICarRepository
  ) {
    Object.assign(this, { repository });
  }

  async execute(): Promise<Car[]> {
    const avaliables = await this.repository.listAvaliables();

    return avaliables;
  }
}

export { ListCarsUseCase };
