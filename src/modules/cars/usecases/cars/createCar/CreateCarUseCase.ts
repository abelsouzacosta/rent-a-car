import { inject, injectable } from "tsyringe";

import { ICreateCarDTO } from "@modules/cars/dtos/cars/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";
import { ApplicationError } from "@shared/errors/ApplicationError";

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
    const plateAlreadyTaken = await this.repository.findByPlate(license_plate);

    if (plateAlreadyTaken)
      throw new ApplicationError("Plate already taken", 409);

    await this.repository.create({
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
