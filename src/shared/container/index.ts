import UserRepositoryImpl from "@modules/accounts/infra/typeorm/repositories/UserRepositoryImpl";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import CarRepositoryImpl from "@modules/cars/infra/typeorm/repositories/CarRepositoryImpl";
import CarsImageRepositoryImpl from "@modules/cars/infra/typeorm/repositories/CarsImageRepositoryImpl";
import CategoryRepositoryImpl from "@modules/cars/infra/typeorm/repositories/CategoryRepositoryImpl";
import SpecificationRepositoryImpl from "@modules/cars/infra/typeorm/repositories/SpecificationRepositoryImpl";
import ICarRepository from "@modules/cars/repositories/ICarRepository";
import ICarsImageRepository from "@modules/cars/repositories/ICarsImageRepository";
import ICategoryRepository from "@modules/cars/repositories/ICategoryRepository";
import ISpecificationRepository from "@modules/cars/repositories/ISpecificationRepository";
import { container } from "tsyringe";

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

container.registerSingleton<ICarRepository>(
  "CarRepositoryImpl",
  CarRepositoryImpl
);

container.registerSingleton<ICarsImageRepository>(
  "CarsImagesRepositoryImpl",
  CarsImageRepositoryImpl
);
