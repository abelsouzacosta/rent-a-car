import { inject, injectable } from "tsyringe";

import { ICreateCarsSpecificationsDTO } from "@modules/cars/dtos/cars/ICreateCarsSpecificationsDTO";
import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/specification/ISpecificationRepository";
import { ISpecificationsCarsRepository } from "@modules/cars/repositories/specifications_cars/ISpecificationsCarsRepository";
import { ApplicationError } from "@shared/errors/ApplicationError";

@injectable()
class CreateCarSpecificationUseCase {
  private carRepository: ICarRepository;
  private specificationRepository: ISpecificationRepository;
  private specificationsCarsRepository: ISpecificationsCarsRepository;

  constructor(
    @inject("CarRepository")
    carRepository: ICarRepository,
    @inject("SpecificationRepository")
    specificationRepository: ISpecificationRepository,
    @inject("SpecificationsCarsRepository")
    specificationsCarsRepository: ISpecificationsCarsRepository
  ) {
    Object.assign(this, {
      carRepository,
      specificationRepository,
      specificationsCarsRepository,
    });
  }

  async execute({
    car_id,
    specifications_id,
  }: ICreateCarsSpecificationsDTO): Promise<void> {
    const car = await this.carRepository.findById(car_id);

    const foundSpecifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    if (!car) throw new ApplicationError("Car not found", 404);

    if (foundSpecifications.length !== specifications_id.length)
      throw new ApplicationError("Some specification was not found", 404);

    specifications_id.forEach(async (specId) => {
      await this.specificationsCarsRepository.create({
        car_id,
        specification_id: specId,
      });
    });
  }
}

export { CreateCarSpecificationUseCase };
