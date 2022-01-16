import { Category } from "@cars/entities/Category";
import { ICategoryRepository } from "@cars/repositories/category/ICategoryRepository";
import { inject, injectable } from "tsyringe";

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
