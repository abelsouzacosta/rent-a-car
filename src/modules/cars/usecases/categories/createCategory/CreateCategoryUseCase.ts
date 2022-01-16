import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "@cars/repositories/category/ICategoryRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCategoryUseCase {
  protected repository: ICategoryRepository;

  constructor(
    @inject("CategoryRepository")
    repository: ICategoryRepository
  ) {
    this.repository = repository;
  }

  async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.repository.findByName(name);

    if (categoryAlreadyExists) throw new Error("Category Already exists");

    this.repository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
