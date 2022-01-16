import { CategoryRepository } from "@modules/cars/repositories/implementations/category/CategoryRepository";

import { DeleteCategoryController } from "./DeleteCategoryController";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

export default (): DeleteCategoryController => {
  const repository = new CategoryRepository();

  const useCase = new DeleteCategoryUseCase(repository);

  const delete_category = new DeleteCategoryController(useCase);

  return delete_category;
};
