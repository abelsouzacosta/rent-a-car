import { Category } from "../../models/Category";
import { CategoryRepository } from "../../repositories/CategoryRepository";

class ListCategoryService {
  protected repository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  execute(): Category[] {
    return this.repository.list();
  }
}

export { ListCategoryService };
