import { Request, Response } from "express";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
  private listSpecificationsUseCase: ListSpecificationsUseCase;

  constructor(listSpecificationUseCase: ListSpecificationsUseCase) {
    this.listSpecificationsUseCase = listSpecificationUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const specifications = await this.listSpecificationsUseCase.execute();

    return response.status(200).json(specifications);
  }
}

export { ListSpecificationsController };
