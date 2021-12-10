import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  private importCategoryUseCase: ImportCategoryUseCase;

  constructor(importCategoryUseCase: ImportCategoryUseCase) {
    this.importCategoryUseCase = importCategoryUseCase;
  }

  handler(request: Request, response: Response): Response {
    const { file } = request;
    this.importCategoryUseCase.execute(file);
    return response.send();
  }
}

export { ImportCategoryController };
