import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../IController";
import { UpdateSpecificationUseCase } from "./UpdateSpecificationUseCase";

class UpdateSpecificationController implements IController {
  handle(request: Request, response: Response): Response {
    const { id } = request.params;
    const { name, description } = request.body;

    const updateSpecificationUseCase = container.resolve(
      UpdateSpecificationUseCase
    );

    updateSpecificationUseCase.execute({ id, name, description });

    return response.status(200).send();
  }
}

export { UpdateSpecificationController };
