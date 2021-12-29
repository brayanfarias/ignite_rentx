import IRequestListAvailableCarDTO from "@modules/cars/dtos/IRequestListCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";
import { Request, Response } from "express";
import { container } from "tsyringe";

import ListAvailableCarUseCase from "./ListAvailableCarUseCase";

export default class ListAvailableCarController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;
    const listAvailableCarUseCase = container.resolve(ListAvailableCarUseCase);
    const car: Car[] = await listAvailableCarUseCase.execute({
      brand,
      name,
      category_id,
    } as IRequestListAvailableCarDTO);
    return response.json(car);
  }
}
