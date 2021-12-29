import { Request, Response } from "express";

import { IController } from "../../IController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSepcificationController implements IController {
  private createSpecificationUseCase: CreateSpecificationUseCase;

  constructor(createSpecificationUseCase: CreateSpecificationUseCase) {
    this.createSpecificationUseCase = createSpecificationUseCase;
  }

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    this.createSpecificationUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateSepcificationController };
