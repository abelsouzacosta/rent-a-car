import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from "@cars/repositories/specification/ISpecificationRepository";

class CreateSpecificationService {
  protected repository: ISpecificationRepository;

  constructor(repository: ISpecificationRepository) {
    this.repository = repository;
  }

  execute({ name, description }: ICreateSpecificationDTO): void {
    const specificationAlreadyExists = this.repository.findByName(name);

    if (specificationAlreadyExists)
      throw new Error("Specification already exists");

    this.repository.create({ name, description });
  }
}

export { CreateSpecificationService };
