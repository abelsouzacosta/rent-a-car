import { Request, Response } from "express";

import { IController } from "../../IController";
import { UdpateCategoryUseCase } from "./UpdateCategoryUseCase";

class UpdateCategoryController implements IController {
  private updateCategoryUseCase: UdpateCategoryUseCase;

  constructor(updateCategoryUsecase: UdpateCategoryUseCase) {
    this.updateCategoryUseCase = updateCategoryUsecase;
  }

  handle(request: Request, response: Response): Response {
    const { id } = request.params;
    const { name, description } = request.body;

    this.updateCategoryUseCase.execute({ id, name, description });

    return response.status(200).send();
  }
}

export { UpdateCategoryController };
