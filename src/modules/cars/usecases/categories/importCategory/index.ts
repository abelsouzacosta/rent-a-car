import { CategoryRepository } from "@modules/cars/repositories/implementations/category/CategoryRepository";

import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export default (): ImportCategoryController => {
  const repository = new CategoryRepository();

  const useCase = new ImportCategoryUseCase(repository);
  const import_category = new ImportCategoryController(useCase);

  return import_category;
};
