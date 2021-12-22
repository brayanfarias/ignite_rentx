import CreateSpecificationController from "@modules/cars/useCases/CreateSpecification/CreateSpecificationController";
import ListSpecificationsController from "@modules/cars/useCases/ListSpecifications/ListSpecificationsController";
import { Router } from "express";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.post("/", createSpecificationController.handler);

specificationRoutes.get("/", listSpecificationsController.handler);

export { specificationRoutes };
