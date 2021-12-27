import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "../../repositories/category/ICategoryRepository";

class CreateCategoryService {
  protected repository: ICategoryRepository;

  constructor(repository: ICategoryRepository) {
    this.repository = repository;
  }

  execute({ name, description }: ICreateCategoryDTO): void {
    const categoryAlreadyExists = this.repository.findByName(name);

    if (categoryAlreadyExists) throw new Error("Category Already exists");

    this.repository.create({ name, description });
  }
}

export { CreateCategoryService };
