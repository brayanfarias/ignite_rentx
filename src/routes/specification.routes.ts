import { Request, Response, Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/CreateSpecification";
import { listSpecificationsController } from "../modules/cars/useCases/ListSpecifications";

const specificationRoutes = Router();

specificationRoutes.post("/", (request: Request, response: Response) => {
  return createSpecificationController.handler(request, response);
});

specificationRoutes.get("/", (request: Request, response: Response) => {
  return listSpecificationsController.handler(request, response);
});

export { specificationRoutes };
