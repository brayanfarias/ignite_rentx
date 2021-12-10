import { CategoryRepositoryImpl } from "../../repositories/implementations/CategoryRepositoryImpl";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoryRepositoryImpl = CategoryRepositoryImpl.getInstance();
const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepositoryImpl);
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);

export { listCategoriesController };
