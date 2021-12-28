import { Request, Response } from "express";

import { IController } from "../../IController";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoryController implements IController {
  private listCategoryUseCase: ListCategoryUseCase;

  constructor(listCategoryUseCase: ListCategoryUseCase) {
    this.listCategoryUseCase = listCategoryUseCase;
  }

  handle(request: Request, response: Response): Response {
    const categories = this.listCategoryUseCase.execute();

    return response.status(200).json(categories);
  }
}

export { ListCategoryController };
