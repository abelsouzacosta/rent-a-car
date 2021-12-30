import { Request, Response } from "express";

import { IController } from "../../IController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController implements IController {
  private importCategoryUseCase: ImportCategoryUseCase;

  constructor(importCategoryUseCase: ImportCategoryUseCase) {
    this.importCategoryUseCase = importCategoryUseCase;
  }

  handle(request: Request, response: Response): Response {
    const { file } = request;

    this.importCategoryUseCase.execute(file);

    return response.status(200).send();
  }
}

export { ImportCategoryController };
