import CreateRentalController from "@modules/rentals/useCases/CreateRental/CreateRentalController";
import DevolutionRentalController from "@modules/rentals/useCases/DevolutionRental/DevolutionRentalController";
import { Router } from "express";

import ensureAuthenticated from "../middlewares/EnsureAuthenticated";

const rentalRoutes = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handler);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handler
);
export { rentalRoutes };
