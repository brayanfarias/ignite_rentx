import uploadConfig from "@config/upload";
import CreateUserController from "@modules/accounts/useCases/CreateUser/CreateUserController";
import UpdateUserAvatarController from "@modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController";
import { Router } from "express";
import multer from "multer";

import ensureAuthenticated from "@shared/infra/http/middlewares/EnsureAuthenticated";

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar/"));

const userRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/", createUserController.handler);

userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handler
);

export { userRoutes };
