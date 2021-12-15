import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/CreateSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../modules/cars/useCases/ListSpecifications/ListSpecificationsController";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.post("/", createSpecificationController.handler);

specificationRoutes.get("/", listSpecificationsController.handler);

export { specificationRoutes };
