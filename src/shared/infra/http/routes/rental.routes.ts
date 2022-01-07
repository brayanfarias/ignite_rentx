import CreateRentalController from "@modules/rentals/useCases/CreateRental/CreateRentalController";
import DevolutionRentalController from "@modules/rentals/useCases/DevolutionRental/DevolutionRentalController";
import ListRentalsByUserController from "@modules/rentals/useCases/ListRentalsByUser/ListRentalsByUserController";
import { Router } from "express";

import ensureAuthenticated from "../middlewares/EnsureAuthenticated";

const rentalRoutes = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handler);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handler
);

rentalRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handler
);

export { rentalRoutes };
