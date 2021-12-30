import { CategoryRepository } from "@modules/cars/repositories/category/CategoryRepository";

import { UpdateCategoryController } from "./UpdateCategoryController";
import { UdpateCategoryUseCase } from "./UpdateCategoryUseCase";

const repository = CategoryRepository.getInstance();

const useCase = new UdpateCategoryUseCase(repository);

const update = new UpdateCategoryController(useCase);

export { update };
