import { inject, injectable } from "tsyringe";

import { ICreateCarDTO } from "@modules/cars/dtos/cars/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";
import { ICategoryRepository } from "@modules/cars/repositories/category/ICategoryRepository";
import { ApplicationError } from "@shared/errors/ApplicationError";

@injectable()
class CreateCarUseCase {
  private repository: ICarRepository;
  private categoryRepository: ICategoryRepository;

  constructor(
    @inject("CarRepository")
    repository: ICarRepository,
    @inject("CategoryRepository")
    categoryRepository: ICategoryRepository
  ) {
    Object.assign(this, { repository, categoryRepository });
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

    const categoryExists = await this.categoryRepository.findById(category_id);

    if (!categoryExists) throw new ApplicationError("Category not found", 404);

    if (plateAlreadyTaken)
      throw new ApplicationError("Plate already taken", 409);

    if (daily_rate <= 0)
      throw new ApplicationError(
        "Daily rate must be a value greater than zero",
        400
      );

    if (fine_amount <= 0 || fine_amount > 1500)
      throw new ApplicationError(
        "Fine amount must be a value greater than zero",
        400
      );

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
