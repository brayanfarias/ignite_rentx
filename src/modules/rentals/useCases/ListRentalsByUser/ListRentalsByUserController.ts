import { Request, Response } from "express";
import { container } from "tsyringe";

import ListRentalsByUserUseCase from "./ListRentalsByUserUseCase";

export default class ListRentalsByUserController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase
    );

    const rentals = await listRentalsByUserUseCase.execute(id);

    return response.json(rentals);
  }
}
