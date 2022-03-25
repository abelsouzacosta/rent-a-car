import { container } from "tsyringe";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { UserTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokenRepository";
import { IUserTokenRepository } from "@modules/accounts/repositories/users_tokens/IUserTokenRepository";
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
import { RentalRepository } from "@modules/rentals/infra/typeorm/repositories/RentalRepository";
import { IRentalRepository } from "@modules/rentals/repositories/rentals/IRentalRepository";

import { IDateProvider } from "./providers/DateProvider/IDateProvider";
import { DayJsDateProvider } from "./providers/DateProvider/implementations/DayJsDateProvider";
import { IMailProvider } from "./providers/MailProvider/IMailProvider";
import { EtherealMailProvider } from "./providers/MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./providers/StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./providers/StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./providers/StorageProvider/IStorageProvider";

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

container.registerSingleton<IDateProvider>("DateProvider", DayJsDateProvider);

container.registerSingleton<IRentalRepository>(
  "RentalRepository",
  RentalRepository
);

container.registerSingleton<IUserTokenRepository>(
  "UserTokenRepository",
  UserTokenRepository
);

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  S3StorageProvider
);

container.registerInstance<IMailProvider>(
  "MailProvider",
  new EtherealMailProvider()
);
