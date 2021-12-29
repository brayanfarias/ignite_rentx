import CreateCarController from "@modules/cars/useCases/CreateCar/CreateCarController";
import CreateCarSpecificationController from "@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController";
import ListAvailableCarController from "@modules/cars/useCases/ListCars/ListAvailableCarController";
import { Router } from "express";

import ensureAdmin from "@shared/infra/http/middlewares/EnsureAdmin";
import ensureAuthenticated from "@shared/infra/http/middlewares/EnsureAuthenticated";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarController();
const createCarSpecificationController = new CreateCarSpecificationController();

carRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handler
);

carRoutes.post(
  "/specifications/:id",
  ensureAdmin,
  ensureAuthenticated,
  createCarSpecificationController.handler
);

carRoutes.get("/available", listAvailableCarController.handler);

export { carRoutes };
