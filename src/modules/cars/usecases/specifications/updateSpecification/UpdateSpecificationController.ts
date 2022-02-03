import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateSpecificationUseCase } from "./UpdateSpecificationUseCase";

class UpdateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description } = request.body;

    const updateSpecificationUseCase = container.resolve(
      UpdateSpecificationUseCase
    );

    await updateSpecificationUseCase.execute({ id, name, description });

    return response.status(200).send();
  }
}

export { UpdateSpecificationController };
