import CreateCarController from "@modules/cars/useCases/CreateCar/CreateCarController";
import { Router } from "express";

const carRoutes = Router();

const createCarController = new CreateCarController();

carRoutes.post("/", createCarController.handler);

export { carRoutes };
