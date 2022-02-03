import { Request, Response } from "express";
import { container } from "tsyringe";

import { UdpateCategoryUseCase } from "./UpdateCategoryUseCase";

class UpdateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description } = request.body;

    const updateCategoryUseCase = container.resolve(UdpateCategoryUseCase);

    await updateCategoryUseCase.execute({ id, name, description });

    return response.status(200).send();
  }
}

export { UpdateCategoryController };
