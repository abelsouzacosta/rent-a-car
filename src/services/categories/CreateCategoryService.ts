import { CategoryRepository } from "../../repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  protected repository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.repository.findByName(name);

    if (categoryAlreadyExists) throw new Error("Category Already exists");

    this.repository.create({ name, description });
  }
}

export { CreateCategoryService };
