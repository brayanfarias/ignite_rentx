import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";
import CreateUserController from "../modules/accounts/useCases/CreateUser/CreateUserController";
import UpdateUserAvatarController from "../modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController";

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
