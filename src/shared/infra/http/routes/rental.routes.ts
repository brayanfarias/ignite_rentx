import CreateRentalController from "@modules/rentals/useCases/CreateRental/CreateRentalController";
import { Router } from "express";

import ensureAuthenticated from "../middlewares/EnsureAuthenticated";

const rentalRoutes = Router();
const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handler);

export { rentalRoutes };
