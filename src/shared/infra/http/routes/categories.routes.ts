import CreateCategoryController from "@modules/cars/useCases/CreateCategory/CreateCategoryController";
import ImportCategoryController from "@modules/cars/useCases/ImportCategory/ImportCategoryController";
import ListCategoriesController from "@modules/cars/useCases/ListCategories/ListCategoriesController";
import { Router } from "express";
import multer from "multer";

import ensureAdmin from "@shared/infra/http/middlewares/EnsureAdmin";
import ensureAuthenticated from "@shared/infra/http/middlewares/EnsureAuthenticated";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

const upload = multer({ dest: "./tmp/spreadsheet/" });

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handler
);

categoriesRoutes.get("/", listCategoriesController.handler);

categoriesRoutes.post(
  "/import",
  ensureAuthenticated,
  ensureAdmin,
  upload.single("file"),
  importCategoryController.handler
);

export { categoriesRoutes };
