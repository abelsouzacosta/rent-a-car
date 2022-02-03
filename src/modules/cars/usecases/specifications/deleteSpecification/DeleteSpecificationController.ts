import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteSpecificationUseCase } from "./DeleteSpecificationUseCase";

class DeleteSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSpecificationUseCase = container.resolve(
      DeleteSpecificationUseCase
    );

    await deleteSpecificationUseCase.execute({ id });

    return response.status(200).send();
  }
}

export { DeleteSpecificationController };
