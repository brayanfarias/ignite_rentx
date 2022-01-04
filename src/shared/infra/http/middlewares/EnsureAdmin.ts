import UserRepositoryImpl from "@modules/accounts/infra/typeorm/repositories/UserRepositoryImpl";
import { NextFunction, Request, Response } from "express";

import AppError from "@shared/errors/AppError";

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const userRepositoryImpl = new UserRepositoryImpl();

  const user = await userRepositoryImpl.findById(id);

  if (user.isAdmin) {
    return next();
  }
  throw new AppError("Denied", 401);
}
