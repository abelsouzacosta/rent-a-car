import { container } from "tsyringe";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { PasswordHandler } from "@modules/accounts/utils/cryptography/implementations/PasswordHandler";
import { IPasswordHandler } from "@modules/accounts/utils/cryptography/password/IPasswordHandler";
import { CarRepository } from "@modules/cars/infra/typeorm/repositories/CarRepository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoryRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarRepository } from "@modules/cars/repositories/cars/ICarRepository";
import { ICategoryRepository } from "@modules/cars/repositories/category/ICategoryRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/specification/ISpecificationRepository";

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
