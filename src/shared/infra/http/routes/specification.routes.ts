import CreateSpecificationController from "@modules/cars/useCases/CreateSpecification/CreateSpecificationController";
import ListSpecificationsController from "@modules/cars/useCases/ListSpecifications/ListSpecificationsController";
import { Router } from "express";

import ensureAdmin from "@shared/infra/http/middlewares/EnsureAdmin";
import ensureAuthenticated from "@shared/infra/http/middlewares/EnsureAuthenticated";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handler
);

specificationRoutes.get("/", listSpecificationsController.handler);

export { specificationRoutes };
