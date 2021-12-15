import { container } from "tsyringe";

import { UserRepositoryImpl } from "../../modules/accounts/repositories/implementations/UserRepositoryImpl";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoryRepository } from "../../modules/cars/repositories/ICategoryRepository";
import { CategoryRepositoryImpl } from "../../modules/cars/repositories/implementations/CategoryRepositoryImpl";
import { SpecificationRepositoryImpl } from "../../modules/cars/repositories/implementations/SpecificationRepositoryImpl";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepositoryImpl",
  CategoryRepositoryImpl
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepositoryImpl",
  SpecificationRepositoryImpl
);

container.registerSingleton<IUsersRepository>(
  "UserRepositoryImpl",
  UserRepositoryImpl
);
