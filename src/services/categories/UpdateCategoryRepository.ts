import { CategoryRepository } from "../../repositories/CategoryRepository";

interface IUpdateRepositoryDTO {
  id: string;
  name?: string;
  description?: string;
}

class UdpateCategoryRepository {
  protected repository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  execute({ id, name, description }: IUpdateRepositoryDTO): void {
    const category = this.repository.findById(id);

    if (!category) throw new Error("Category not found");

    this.repository.update(id, name, description);
  }
}

export { UdpateCategoryRepository };
