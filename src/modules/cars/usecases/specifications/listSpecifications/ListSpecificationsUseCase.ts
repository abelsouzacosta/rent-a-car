import { Specification } from "@cars/entities/Specification";
import { ISpecificationRepository } from "@cars/repositories/specification/ISpecificationRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSpecificationsUseCase {
  protected repository: ISpecificationRepository;

  constructor(
    @inject("SpecificationRepository")
    repository: ISpecificationRepository
  ) {
    this.repository = repository;
  }

  async execute(): Promise<Specification[]> {
    const specifications = await this.repository.list();

    return specifications;
  }
}

export { ListSpecificationsUseCase };
