import { inject, injectable } from "tsyringe";

import { ApplicationError } from "@shared/errors/ApplicationError";
import { IDeleteSpecificationDTO } from "@modules/cars/dtos/specifications/IDeleteSpecificationDTO";
import { ISpecificationRepository } from "@modules/cars/repositories/specification/ISpecificationRepository";

@injectable()
class DeleteSpecificationUseCase {
  protected repository: ISpecificationRepository;

  constructor(
    @inject("SpecificationRepository")
    repository: ISpecificationRepository
  ) {
    this.repository = repository;
  }

  async execute({ id }: IDeleteSpecificationDTO): Promise<void> {
    const specification = await this.repository.findById(id);

    if (!specification)
      throw new ApplicationError("Specification not found", 404);

    this.repository.delete({ id });
  }
}

export { DeleteSpecificationUseCase };
