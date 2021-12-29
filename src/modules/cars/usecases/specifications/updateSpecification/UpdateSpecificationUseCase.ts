import {
  ISpecificationRepository,
  IUpdateSpecificationDTO,
} from "@modules/cars/repositories/specification/ISpecificationRepository";

class UpdateSpecificationUseCase {
  protected repository: ISpecificationRepository;

  constructor(repository: ISpecificationRepository) {
    this.repository = repository;
  }

  execute({ id, name, description }: IUpdateSpecificationDTO): void {
    const specification = this.repository.findById(id);

    const foundSpecificationByName = this.repository.findByName(name);

    if (
      foundSpecificationByName &&
      foundSpecificationByName.id !== specification.id
    )
      throw new Error(`There's already an specification with the given name`);

    if (!specification) throw new Error("Specification not found");

    this.repository.update({ id, name, description });
  }
}

export { UpdateSpecificationUseCase };
