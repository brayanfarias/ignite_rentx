import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/CreateCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/ImportCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/ListCategories/ListCategoriesController";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

const upload = multer({ dest: "./tmp/spreadsheet/" });

categoriesRoutes.post("/", createCategoryController.handler);

categoriesRoutes.get("/", listCategoriesController.handler);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handler
);

export { categoriesRoutes };
