import { CategoryRepository } from "@modules/cars/repositories/implementations/category/CategoryRepository";

import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export default (): CreateCategoryController => {
  const repository = new CategoryRepository();

  const useCase = new CreateCategoryUseCase(repository);

  const create = new CreateCategoryController(useCase);

  return create;
};
