import { inject, injectable } from "tsyringe";

import { ApplicationError } from "../../../../../errors/ApplicationError";
import { ICreateCategoryDTO } from "../../../dtos/categories/ICreateCategoryDTO";
import { ICategoryRepository } from "../../../repositories/category/ICategoryRepository";

@injectable()
class CreateCategoryUseCase {
  protected repository: ICategoryRepository;

  constructor(
    @inject("CategoryRepository")
    repository: ICategoryRepository
  ) {
    this.repository = repository;
  }

  async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.repository.findByName(name);

    if (categoryAlreadyExists)
      throw new ApplicationError("Category Already exists", 409);

    this.repository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
