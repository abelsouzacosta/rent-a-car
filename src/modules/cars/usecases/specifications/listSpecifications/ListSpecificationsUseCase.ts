import { Specification } from "@cars/models/Specification";
import { ISpecificationRepository } from "@cars/repositories/specification/ISpecificationRepository";

class ListSpecificationsUseCase {
  protected repository: ISpecificationRepository;

  constructor(repository: ISpecificationRepository) {
    this.repository = repository;
  }

  execute(): Specification[] {
    return this.repository.list();
  }
}

export { ListSpecificationsUseCase };
