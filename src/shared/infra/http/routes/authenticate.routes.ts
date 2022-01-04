import AuthenticateUserController from "@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";
import { Router } from "express";

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authRoutes.post("/sessions", authenticateUserController.handler);

export { authRoutes };
