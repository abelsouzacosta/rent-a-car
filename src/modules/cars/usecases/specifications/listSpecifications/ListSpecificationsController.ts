import { Request, Response } from "express";

import { IController } from "../../IController";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController implements IController {
  private listSpecificationsUseCase: ListSpecificationsUseCase;

  constructor(listSpecificationUseCase: ListSpecificationsUseCase) {
    this.listSpecificationsUseCase = listSpecificationUseCase;
  }

  handle(request: Request, response: Response): Response {
    const specifications = this.listSpecificationsUseCase.execute();

    return response.status(200).json(specifications);
  }
}

export { ListSpecificationsController };
