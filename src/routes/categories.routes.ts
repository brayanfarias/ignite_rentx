import { Request, Response, Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/CreateCategory";
import { importCategoryController } from "../modules/cars/useCases/ImportCategory";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";

const categoriesRoutes = Router();

const upload = multer({ dest: "./tmp" });

categoriesRoutes.post("/", (request: Request, response: Response) => {
  return createCategoryController.handler(request, response);
});

categoriesRoutes.get("/", (request: Request, response: Response) => {
  return listCategoriesController.handler(request, response);
});

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  (request: Request, response: Response) => {
    return importCategoryController.handler(request, response);
  }
);

export { categoriesRoutes };
