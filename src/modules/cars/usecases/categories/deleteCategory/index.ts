import { CategoryRepository } from "@modules/cars/repositories/category/CategoryRepository";

import { DeleteCategoryController } from "./DeleteCategoryController";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

const repository = CategoryRepository.getInstance();

const useCase = new DeleteCategoryUseCase(repository);

const delete_category = new DeleteCategoryController(useCase);

export { delete_category };
