import {
  ICategoryRepository,
  IUpdateCategoryDTO,
} from "@cars/repositories/category/ICategoryRepository";
import { ApplicationError } from "src/errors/ApplicationError";
import { inject, injectable } from "tsyringe";

@injectable()
class UdpateCategoryUseCase {
  protected repository: ICategoryRepository;

  constructor(
    @inject("CategoryRepository")
    repository: ICategoryRepository
  ) {
    this.repository = repository;
  }

  async execute({ id, name, description }: IUpdateCategoryDTO): Promise<void> {
    const category = await this.repository.findById(id);

    const foundCategoryByName = await this.repository.findByName(name);

    if (!category)
      throw new ApplicationError(
        "Category not found",
        404,
        __filename,
        __dirname
      );

    if (foundCategoryByName && foundCategoryByName.id !== category.id)
      throw new ApplicationError(
        `There's already an category with the given name`,
        409,
        __filename,
        __dirname
      );

    this.repository.update({ id, name, description });
  }
}

export { UdpateCategoryUseCase };
