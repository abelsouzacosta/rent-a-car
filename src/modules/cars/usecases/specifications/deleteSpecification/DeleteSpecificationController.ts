import { Request, Response } from "express";

import { IController } from "../../IController";
import { DeleteSpecificationUseCase } from "./DeleteSpecificationUseCase";

class DeleteSpecificationController implements IController {
  private deleteSpecificationUseCase: DeleteSpecificationUseCase;

  constructor(deleteSpecificationUseCase: DeleteSpecificationUseCase) {
    this.deleteSpecificationUseCase = deleteSpecificationUseCase;
  }

  handle(request: Request, response: Response): Response {
    const { id } = request.params;

    this.deleteSpecificationUseCase.execute({ id });

    return response.status(200).send();
  }
}

export { DeleteSpecificationController };
