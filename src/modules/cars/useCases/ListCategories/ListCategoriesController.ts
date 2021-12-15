import { Request, Response } from "express";
import { container } from "tsyringe";

import { Category } from "../../entities/Category";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  async handler(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    const categories: Category[] = await listCategoriesUseCase.execute();
    return response.json(categories);
  }
}

export { ListCategoriesController };
