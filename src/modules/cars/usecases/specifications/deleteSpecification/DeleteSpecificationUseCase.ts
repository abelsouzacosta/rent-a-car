import {
  ISpecificationRepository,
  IDeleteSpecificationDTO,
} from "@modules/cars/repositories/specification/ISpecificationRepository";
import { inject, injectable } from "tsyringe";

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

    if (!specification) throw new Error("Specification not found");

    this.repository.delete(id);
  }
}

export { DeleteSpecificationUseCase };
