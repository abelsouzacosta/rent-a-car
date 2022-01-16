import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from "@cars/repositories/specification/ISpecificationRepository";

class CreateSpecificationUseCase {
  protected repository: ISpecificationRepository;

  constructor(repository: ISpecificationRepository) {
    this.repository = repository;
  }

  async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specificationAlreadyExists = await this.repository.findByName(name);

    if (specificationAlreadyExists)
      throw new Error("Specification already exists");

    this.repository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
