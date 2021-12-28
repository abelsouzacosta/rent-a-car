import { Category } from "@cars/models/Category";
import { ICategoryRepository } from "@cars/repositories/category/ICategoryRepository";

class ListCategoryUseCase {
  protected repository: ICategoryRepository;

  constructor(repository: ICategoryRepository) {
    this.repository = repository;
  }

  execute(): Category[] {
    return this.repository.list();
  }
}

export { ListCategoryUseCase };
