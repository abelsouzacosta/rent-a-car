import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../IController";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

class DeleteCategoryController implements IController {
  handle(request: Request, response: Response): Response {
    const { id } = request.params;

    const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);

    deleteCategoryUseCase.execute({ id });

    return response.status(200).send();
  }
}

export { DeleteCategoryController };
