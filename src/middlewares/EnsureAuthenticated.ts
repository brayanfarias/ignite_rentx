import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import AppError from "../errors/AppError";
import { UserRepositoryImpl } from "../modules/accounts/repositories/implementations/UserRepositoryImpl";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const auth = request.headers.authorization;

  if (!auth) throw new AppError("Token missing", 401);

  const [, token] = auth.split(" ");

  try {
    const { sub: user_id } = verify(token, "a_secret");

    const userRepositoryImpl = new UserRepositoryImpl();
    const user = await userRepositoryImpl.findById(user_id as string);
    if (!user) throw new AppError("User not found", 401);

    request.user = {
      id: user_id as string,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}
