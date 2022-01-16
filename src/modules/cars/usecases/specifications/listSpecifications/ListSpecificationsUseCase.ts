import { Specification } from "@cars/entities/Specification";
import { ISpecificationRepository } from "@cars/repositories/specification/ISpecificationRepository";

class ListSpecificationsUseCase {
  protected repository: ISpecificationRepository;

  constructor(repository: ISpecificationRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Specification[]> {
    const specifications = await this.repository.list();

    return specifications;
  }
}

export { ListSpecificationsUseCase };
