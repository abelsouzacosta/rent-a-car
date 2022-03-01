import { inject, injectable } from "tsyringe";

import { ICreateCarDTO } from "@modules/cars/dtos/cars/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";

@injectable()
class CreateCarUseCase {
  private repository: ICarRepository;

  constructor(
    @inject("CarRepository")
    repository: ICarRepository
  ) {
    Object.assign(this, { repository });
  }

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<void> {
    this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });
  }
}

export { CreateCarUseCase };
