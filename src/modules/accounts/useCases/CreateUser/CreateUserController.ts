import { Request, Response } from "express";
import { container } from "tsyringe";

import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import CreateUserUseCase from "./CreateUserUseCase";

export default class CreateUserController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { name, username, password, email, driver_license } = request.body;
    const user = {
      name,
      username,
      password,
      email,
      driver_license,
    } as ICreateUserDTO;
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const created = await createUserUseCase.execute(user);
    return response.status(201).json(created);
  }
}
