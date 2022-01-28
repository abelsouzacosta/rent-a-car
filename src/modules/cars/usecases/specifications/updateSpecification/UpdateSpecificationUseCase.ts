import {
  ISpecificationRepository,
  IUpdateSpecificationDTO,
} from "@modules/cars/repositories/specification/ISpecificationRepository";
import { ApplicationError } from "src/errors/ApplicationError";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateSpecificationUseCase {
  protected repository: ISpecificationRepository;

  constructor(
    @inject("SpecificationRepository")
    repository: ISpecificationRepository
  ) {
    this.repository = repository;
  }

  async execute({
    id,
    name,
    description,
  }: IUpdateSpecificationDTO): Promise<void> {
    const specification = await this.repository.findById(id);

    const foundSpecificationByName = await this.repository.findByName(name);

    if (
      foundSpecificationByName &&
      foundSpecificationByName.id !== specification.id
    )
      throw new Error(`There's already an specification with the given name`);

    if (!specification)
      throw new ApplicationError(
        "Specification not found",
        404,
        __filename,
        __dirname
      );

    this.repository.update({ id, name, description });
  }
}

export { UpdateSpecificationUseCase };
