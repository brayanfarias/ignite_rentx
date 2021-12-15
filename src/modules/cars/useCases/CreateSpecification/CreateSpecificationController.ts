import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "../CreateCategory/CreateCategoryUseCase";

class CreateSpecificationController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(CreateCategoryUseCase);
    await createSpecificationUseCase.execute({ name, description });
    return response.status(201).send();
  }
}

export { CreateSpecificationController };
