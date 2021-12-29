import { Request, Response } from "express";

import { IController } from "../../IController";
import { UpdateSpecificationUseCase } from "./UpdateSpecificationUseCase";

class UpdateSpecificationController implements IController {
  private updateSpecificationUseCase: UpdateSpecificationUseCase;

  constructor(updateSpecificationUseCase: UpdateSpecificationUseCase) {
    this.updateSpecificationUseCase = updateSpecificationUseCase;
  }

  handle(request: Request, response: Response): Response {
    const { id } = request.params;
    const { name, description } = request.body;

    this.updateSpecificationUseCase.execute({ id, name, description });

    return response.status(200).send();
  }
}

export { UpdateSpecificationController };
