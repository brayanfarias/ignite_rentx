import { CategoryRepositoryImpl } from "../../repositories/implementations/CategoryRepositoryImpl";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoryRepositoryImpl = CategoryRepositoryImpl.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoryRepositoryImpl);
const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);
export { importCategoryController };
