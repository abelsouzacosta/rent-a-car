import {
  ICategoryRepository,
  IUpdateCategoryDTO,
} from "@cars/repositories/category/ICategoryRepository";

class UdpateCategoryService {
  protected repository: ICategoryRepository;

  constructor(repository: ICategoryRepository) {
    this.repository = repository;
  }

  execute({ id, name, description }: IUpdateCategoryDTO): void {
    const category = this.repository.findById(id);

    const foundCategoryByName = this.repository.findByName(name);

    if (!category) throw new Error("Category not found");

    if (foundCategoryByName && foundCategoryByName.id !== category.id)
      throw new Error(`There's already an category with the given name`);

    this.repository.update({ id, name, description });
  }
}

export { UdpateCategoryService };
