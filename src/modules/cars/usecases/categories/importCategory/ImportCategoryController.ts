import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../IController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController implements IController {
  handle(request: Request, response: Response): Response {
    const { file } = request;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    importCategoryUseCase.execute(file);

    return response.status(200).send();
  }
}

export { ImportCategoryController };
