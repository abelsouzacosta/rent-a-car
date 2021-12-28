import { Request, Response } from "express";

import { IController } from "../../IController";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

class DeleteCategoryController implements IController {
  private deleteCategoryUseCase: DeleteCategoryUseCase;

  constructor(deleteCategoryUseCase: DeleteCategoryUseCase) {
    this.deleteCategoryUseCase = deleteCategoryUseCase;
  }

  handle(request: Request, response: Response): Response {
    const { id } = request.params;

    this.deleteCategoryUseCase.execute({ id });

    return response.status(200).send();
  }
}

export { DeleteCategoryController };
