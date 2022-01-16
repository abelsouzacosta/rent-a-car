import { CategoryRepository } from "@modules/cars/repositories/implementations/category/CategoryRepository";

import { ListCategoryController } from "./ListCategoryController";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

export default (): ListCategoryController => {
  const repository = new CategoryRepository();

  const useCase = new ListCategoryUseCase(repository);

  const list = new ListCategoryController(useCase);

  return list;
};
