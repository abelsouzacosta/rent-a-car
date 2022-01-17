import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../IController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSepcificationController implements IController {
  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    createSpecificationUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateSepcificationController };
