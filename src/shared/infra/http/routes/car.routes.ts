import uploadConfig from "@config/upload";
import CreateCarController from "@modules/cars/useCases/CreateCar/CreateCarController";
import CreateCarSpecificationController from "@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController";
import ListAvailableCarController from "@modules/cars/useCases/ListCars/ListAvailableCarController";
import UploadCarImagesController from "@modules/cars/useCases/UploadCarImages/UploadCarImagesController";
import { Router } from "express";
import multer from "multer";

import ensureAdmin from "@shared/infra/http/middlewares/EnsureAdmin";
import ensureAuthenticated from "@shared/infra/http/middlewares/EnsureAuthenticated";

const upload = multer(uploadConfig.upload("./tmp/cars/"));

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handler
);

carRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handler
);

carRoutes.get("/available", listAvailableCarController.handler);

carRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handler
);

export { carRoutes };
