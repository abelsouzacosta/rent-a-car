import {
  ICategoryRepository,
  IUpdateCategoryDTO,
} from "../../repositories/category/ICategoryRepository";

class UdpateCategoryService {
  protected repository: ICategoryRepository;

  constructor(repository: ICategoryRepository) {
    this.repository = repository;
  }

  execute({ id, name, description }: IUpdateCategoryDTO): void {
    const category = this.repository.findById(id);

    if (!category) throw new Error("Category not found");

    this.repository.update({ id, name, description });
  }
}

export { UdpateCategoryService };
