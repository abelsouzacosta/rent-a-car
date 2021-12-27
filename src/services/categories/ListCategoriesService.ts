import { Category } from "@models/Category";
import { ICategoryRepository } from "@repositories/category/ICategoryRepository";

class ListCategoryService {
  protected repository: ICategoryRepository;

  constructor(repository: ICategoryRepository) {
    this.repository = repository;
  }

  execute(): Category[] {
    return this.repository.list();
  }
}

export { ListCategoryService };
