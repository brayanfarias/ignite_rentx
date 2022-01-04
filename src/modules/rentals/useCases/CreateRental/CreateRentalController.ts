import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateRentalUseCase from "./CreateRentalUseCase";

export default class CreateRentalController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { expected_return_date, car_id } = request.body;
    const { id } = request.user;
    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      user_id: id,
      expected_return_date,
    });

    return response.json(rental);
  }
}
