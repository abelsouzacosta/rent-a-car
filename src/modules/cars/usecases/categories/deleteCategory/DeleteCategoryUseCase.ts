import { ICategoryRepository } from "@cars/repositories/category/ICategoryRepository";
import { ApplicationError } from "src/errors/ApplicationError";
import { inject, injectable } from "tsyringe";

interface IDeleteCategoryDTO {
  id: string;
}

@injectable()
class DeleteCategoryUseCase {
  protected repository: ICategoryRepository;

  constructor(
    @inject("CategoryRepository")
    repository: ICategoryRepository
  ) {
    this.repository = repository;
  }

  async execute({ id }: IDeleteCategoryDTO): Promise<void> {
    const category = await this.repository.findById(id);

    if (!category)
      throw new ApplicationError(
        "Category not found",
        404,
        __filename,
        __dirname
      );

    this.repository.delete(id);
  }
}

export { DeleteCategoryUseCase };
