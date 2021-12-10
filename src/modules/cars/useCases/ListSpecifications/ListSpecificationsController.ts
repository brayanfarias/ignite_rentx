import { Request, Response } from "express";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
  private listSpecificationsUseCase: ListSpecificationsUseCase;

  constructor(listSpecificationsUseCase: ListSpecificationsUseCase) {
    this.listSpecificationsUseCase = listSpecificationsUseCase;
  }
  handler(request: Request, response: Response): Response {
    const all = this.listSpecificationsUseCase.execute();
    return response.json(all);
  }
}

export { ListSpecificationsController };
