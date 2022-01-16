import { ICategoryRepository } from "@cars/repositories/category/ICategoryRepository";
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

    if (!category) throw new Error("Category not found");

    this.repository.delete(id);
  }
}

export { DeleteCategoryUseCase };
