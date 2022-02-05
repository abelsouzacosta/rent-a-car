import { Category } from "@cars/entities/Category";
import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "../../../repositories/category/ICategoryRepository";

@injectable()
class ListCategoryUseCase {
  protected repository: ICategoryRepository;

  constructor(
    @inject("CategoryRepository")
    repository: ICategoryRepository
  ) {
    this.repository = repository;
  }

  async execute(): Promise<Category[]> {
    const categories = await this.repository.list();

    return categories;
  }
}

export { ListCategoryUseCase };
