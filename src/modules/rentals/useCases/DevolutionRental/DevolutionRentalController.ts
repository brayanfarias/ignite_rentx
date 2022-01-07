import { Request, Response } from "express";
import { container } from "tsyringe";

import DevolutionRentalUseCase from "./DevolutionRentalUseCase";

export default class DevolutionRentalController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id: rental_id } = request.params;
    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);
    const rental = await devolutionRentalUseCase.execute({
      rental_id,
    });

    return response.status(200).json(rental);
  }
}
