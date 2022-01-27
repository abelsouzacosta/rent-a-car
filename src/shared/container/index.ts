import { UserRepository } from "@modules/accounts/repositories/implementations/UserRepository";
import { IUserRepository } from "@modules/accounts/repositories/users/IUserRepository";
import { PasswordHandler } from "@modules/accounts/utils/cryptography/implementations/PasswordHandler";
import { IPasswordHandler } from "@modules/accounts/utils/cryptography/password/IPasswordHandler";
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

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IPasswordHandler>(
  "PasswordHandler",
  PasswordHandler
);
