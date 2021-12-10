import { Request, Response } from "express";

import { Category } from "../../model/Category";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  private listCategoriesUseCase: ListCategoriesUseCase;

  constructor(createCategoryUseCase: ListCategoriesUseCase) {
    this.listCategoriesUseCase = createCategoryUseCase;
  }
  handler(request: Request, response: Response): Response {
    const categories: Category[] = this.listCategoriesUseCase.execute();
    return response.json(categories);
  }
}

export { ListCategoriesController };
