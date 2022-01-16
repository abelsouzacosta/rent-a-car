import {
  ICategoryRepository,
  IUpdateCategoryDTO,
} from "@cars/repositories/category/ICategoryRepository";

class UdpateCategoryUseCase {
  protected repository: ICategoryRepository;

  constructor(repository: ICategoryRepository) {
    this.repository = repository;
  }

  async execute({ id, name, description }: IUpdateCategoryDTO): Promise<void> {
    const category = await this.repository.findById(id);

    const foundCategoryByName = await this.repository.findByName(name);

    if (!category) throw new Error("Category not found");

    if (foundCategoryByName && foundCategoryByName.id !== category.id)
      throw new Error(`There's already an category with the given name`);

    this.repository.update({ id, name, description });
  }
}

export { UdpateCategoryUseCase };
