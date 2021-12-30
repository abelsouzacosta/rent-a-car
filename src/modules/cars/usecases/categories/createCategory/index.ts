import { CategoryRepository } from "@modules/cars/repositories/implementations/category/CategoryRepository";

import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const repository = CategoryRepository.getInstance();

const useCase = new CreateCategoryUseCase(repository);

const create = new CreateCategoryController(useCase);

export { create };
