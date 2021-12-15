import { Router } from "express";

import AuthenticateUserController from "../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authRoutes.post("/sessions", authenticateUserController.handler);

export { authRoutes };
