import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from "@cars/repositories/specification/ISpecificationRepository";
import { ApplicationError } from "src/errors/ApplicationError";
import { inject, injectable } from "tsyringe";

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
