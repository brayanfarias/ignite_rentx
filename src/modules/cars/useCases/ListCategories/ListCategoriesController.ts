import Category from "@modules/cars/infra/typeorm/entities/Category";
import ListCategoriesUseCase from "@modules/cars/useCases/ListCategories/ListCategoriesUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ListCategoriesController {
  async handler(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    const categories: Category[] = await listCategoriesUseCase.execute();
    return response.json(categories);
  }
}
