import { Specification } from "@cars/models/Specification";
import { ISpecificationRepository } from "@cars/repositories/specification/ISpecificationRepository";

class ListSpecificationsService {
  protected repository: ISpecificationRepository;

  constructor(repository: ISpecificationRepository) {
    this.repository = repository;
  }

  execute(): Specification[] {
    return this.repository.list();
  }
}

export { ListSpecificationsService };
