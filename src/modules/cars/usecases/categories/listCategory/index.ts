import { CategoryRepository } from "@modules/cars/repositories/implementations/category/CategoryRepository";

import { ListCategoryController } from "./ListCategoryController";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

const repository = CategoryRepository.getInstance();

const useCase = new ListCategoryUseCase(repository);

const list = new ListCategoryController(useCase);

export { list };
