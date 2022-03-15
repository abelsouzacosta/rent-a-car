import { container } from "tsyringe";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { PasswordHandler } from "@modules/accounts/utils/cryptography/implementations/PasswordHandler";
import { IPasswordHandler } from "@modules/accounts/utils/cryptography/password/IPasswordHandler";
import { CarRepository } from "@modules/cars/infra/typeorm/repositories/CarRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoryRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { SpecificationsCarsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsCarsRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/cars_images/ICarsImagesRepository";
import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";
import { ICategoryRepository } from "@modules/cars/repositories/category/ICategoryRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/specification/ISpecificationRepository";
import { ISpecificationsCarsRepository } from "@modules/cars/repositories/specifications_cars/ISpecificationsCarsRepository";
import { IRentalRepository } from "@modules/rentals/repositories/rentals/IRentalRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IPasswordHandler>(
  "PasswordHandler",
  PasswordHandler
);

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);

container.registerSingleton<ISpecificationsCarsRepository>(
  "SpecificationsCarsRepository",
  SpecificationsCarsRepository
);

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);
