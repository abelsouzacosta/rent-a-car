import { CategoryRepository } from "@cars/repositories/category/CategoryRepository";

import { CreateCategoryController } from "./createCategory/CreateCategoryController";
import { CreateCategoryUseCase } from "./createCategory/CreateCategoryUseCase";
import { DeleteCategoryController } from "./deleteCategory/DeleteCategoryController";
import { DeleteCategoryUseCase } from "./deleteCategory/DeleteCategoryUseCase";
import { ListCategoryController } from "./listCategory/ListCategoryController";
import { ListCategoryUseCase } from "./listCategory/ListCategoryUseCase";
import { UpdateCategoryController } from "./updateCategory/UpdateCategoryController";
import { UdpateCategoryUseCase } from "./updateCategory/UpdateCategoryUseCase";

const repository = CategoryRepository.getInstance();

const createCategoryUseCase = new CreateCategoryUseCase(repository);
const listCategoryUseCase = new ListCategoryUseCase(repository);
const updateCategoryUseCase = new UdpateCategoryUseCase(repository);
const deleteCategoryUseCase = new DeleteCategoryUseCase(repository);

const create = new CreateCategoryController(createCategoryUseCase);

const list = new ListCategoryController(listCategoryUseCase);

const update = new UpdateCategoryController(updateCategoryUseCase);

const delete_category = new DeleteCategoryController(deleteCategoryUseCase);

export { create, list, update, delete_category };
