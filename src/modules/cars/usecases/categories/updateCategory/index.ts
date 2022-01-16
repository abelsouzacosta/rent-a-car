import { CategoryRepository } from "@modules/cars/repositories/implementations/category/CategoryRepository";

import { UpdateCategoryController } from "./UpdateCategoryController";
import { UdpateCategoryUseCase } from "./UpdateCategoryUseCase";

export default (): UpdateCategoryController => {
  const repository = new CategoryRepository();

  const useCase = new UdpateCategoryUseCase(repository);

  const update = new UpdateCategoryController(useCase);

  return update;
};
