import { inject, injectable } from "tsyringe";

import { ApplicationError } from "@errors/ApplicationError";
import { IDeleteCategoryDTO } from "@modules/cars/dtos/categories/IDeleteCategoryDTO";
import { ICategoryRepository } from "@modules/cars/repositories/category/ICategoryRepository";

@injectable()
class DeleteCategoryUseCase {
  protected repository: ICategoryRepository;

  constructor(
    @inject("CategoryRepository")
    repository: ICategoryRepository
  ) {
    this.repository = repository;
  }

  async execute({ id }: IDeleteCategoryDTO): Promise<void> {
    const category = await this.repository.findById(id);

    if (!category) throw new ApplicationError("Category not found", 404);

    this.repository.delete(id);
  }
}

export { DeleteCategoryUseCase };
