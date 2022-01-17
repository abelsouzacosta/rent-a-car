import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../IController";
import { DeleteSpecificationUseCase } from "./DeleteSpecificationUseCase";

class DeleteSpecificationController implements IController {
  handle(request: Request, response: Response): Response {
    const { id } = request.params;

    const deleteSpecificationUseCase = container.resolve(
      DeleteSpecificationUseCase
    );

    deleteSpecificationUseCase.execute({ id });

    return response.status(200).send();
  }
}

export { DeleteSpecificationController };
