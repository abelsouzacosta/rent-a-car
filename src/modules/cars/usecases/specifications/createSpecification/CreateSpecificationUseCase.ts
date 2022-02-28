import { inject, injectable } from "tsyringe";

import { ApplicationError } from "@shared/errors/ApplicationError";
import { ICreateSpecificationDTO } from "@modules/cars/dtos/specifications/ICreateSpecificationDTO";
import { ISpecificationRepository } from "@modules/cars/repositories/specification/ISpecificationRepository";

@injectable()
class CreateSpecificationUseCase {
  protected repository: ISpecificationRepository;

  constructor(
    @inject("SpecificationRepository")
    repository: ISpecificationRepository
  ) {
    this.repository = repository;
  }

  async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specificationAlreadyExists = await this.repository.findByName(name);

    if (specificationAlreadyExists)
      throw new ApplicationError("Specification already exists", 409);

    this.repository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
