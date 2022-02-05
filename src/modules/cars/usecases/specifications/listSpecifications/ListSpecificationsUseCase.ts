import { inject, injectable } from "tsyringe";

import { Specification } from "../../../entities/Specification";
import { ISpecificationRepository } from "../../../repositories/specification/ISpecificationRepository";

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
