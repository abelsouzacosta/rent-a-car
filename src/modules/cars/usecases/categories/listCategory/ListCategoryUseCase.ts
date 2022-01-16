import { Category } from "@cars/entities/Category";
import { ICategoryRepository } from "@cars/repositories/category/ICategoryRepository";

class ListCategoryUseCase {
  protected repository: ICategoryRepository;

  constructor(repository: ICategoryRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Category[]> {
    const categories = await this.repository.list();

    return categories;
  }
}

export { ListCategoryUseCase };
