import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "@cars/repositories/category/ICategoryRepository";

class CreateCategoryUseCase {
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

export { CreateCategoryUseCase };
