import { ICategoryRepository } from "@cars/repositories/category/ICategoryRepository";

interface IDeleteCategoryDTO {
  id: string;
}

class DeleteCategoryUseCase {
  protected repository: ICategoryRepository;

  constructor(repository: ICategoryRepository) {
    this.repository = repository;
  }

  execute({ id }: IDeleteCategoryDTO): void {
    const category = this.repository.findById(id);

    if (!category) throw new Error("Category not found");

    this.repository.delete(id);
  }
}

export { DeleteCategoryUseCase };
