import { CategoryRepository } from "@modules/cars/repositories/implementations/category/CategoryRepository";

import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const repository = CategoryRepository.getInstance();

const useCase = new ImportCategoryUseCase(repository);
const import_category = new ImportCategoryController(useCase);

export { import_category };
