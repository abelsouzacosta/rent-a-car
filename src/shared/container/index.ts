import { ICategoryRepository } from "@modules/cars/repositories/category/ICategoryRepository";
import { CategoryRepository } from "@modules/cars/repositories/implementations/category/CategoryRepository";
import { SpecificationRepository } from "@modules/cars/repositories/implementations/specification/SpecificationRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/specification/ISpecificationRepository";
import { container } from "tsyringe";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);
