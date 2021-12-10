import { CategoryRepositoryImpl } from "../../repositories/implementations/CategoryRepositoryImpl";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoryRepositoryImpl = CategoryRepositoryImpl.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepositoryImpl);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);

export { createCategoryController };
