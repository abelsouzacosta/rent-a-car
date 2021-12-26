import { CategoryRepository } from "../../repositories/CategoryRepository";

interface IDeleteCategoryDTO {
  id: string;
}

class DeleteCategoryService {
  protected repository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  execute({ id }: IDeleteCategoryDTO): void {
    const category = this.repository.findById(id);

    if (!category) throw new Error("Category not found");

    this.repository.delete(id);
  }
}

export { DeleteCategoryService };
