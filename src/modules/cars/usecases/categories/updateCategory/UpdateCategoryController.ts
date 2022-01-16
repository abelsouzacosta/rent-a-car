import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../IController";
import { UdpateCategoryUseCase } from "./UpdateCategoryUseCase";

class UpdateCategoryController implements IController {
  handle(request: Request, response: Response): Response {
    const { id } = request.params;
    const { name, description } = request.body;

    const updateCategoryUseCase = container.resolve(UdpateCategoryUseCase);

    updateCategoryUseCase.execute({ id, name, description });

    return response.status(200).send();
  }
}

export { UpdateCategoryController };
