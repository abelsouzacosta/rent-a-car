import {
  ISpecificationRepository,
  IUpdateSpecificationDTO,
} from "@modules/cars/repositories/specification/ISpecificationRepository";

class UpdateSpecificationService {
  protected repository: ISpecificationRepository;

  constructor(repository: ISpecificationRepository) {
    this.repository = repository;
  }

  execute({ id, name, description }: IUpdateSpecificationDTO): void {
    const specification = this.repository.findById(id);

    if (!specification) throw new Error("Specification not found");

    this.repository.update({ id, name, description });
  }
}

export { UpdateSpecificationService };
