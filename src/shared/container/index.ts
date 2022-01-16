import { ICategoryRepository } from "@modules/cars/repositories/category/ICategoryRepository";
import { CategoryRepository } from "@modules/cars/repositories/implementations/category/CategoryRepository";
import { container } from "tsyringe";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);
