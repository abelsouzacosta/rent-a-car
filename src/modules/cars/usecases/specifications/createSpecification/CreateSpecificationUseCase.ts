import { inject, injectable } from "tsyringe";

import { ApplicationError } from "../../../../../errors/ApplicationError";
import { ICreateSpecificationDTO } from "../../../dtos/specifications/ICreateSpecificationDTO";
import { ISpecificationRepository } from "../../../repositories/specification/ISpecificationRepository";

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
