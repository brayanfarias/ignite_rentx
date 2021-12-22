import IRequestCreateCar from "@modules/cars/dtos/IRequestCreateCar";
import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCarUseCase from "./CreateCarUseCase";

export default class CreateCarController {
  async handler(request: Request, response: Response): Promise<Response> {
    const car: IRequestCreateCar = { ...request.body };
    const createCarUseCase = container.resolve(CreateCarUseCase);
    const created = await createCarUseCase.execute(car);

    return response.status(201).json(created);
  }
}
