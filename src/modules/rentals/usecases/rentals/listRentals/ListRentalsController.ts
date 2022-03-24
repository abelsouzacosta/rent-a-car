import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsUseCase } from "./ListRentalsUseCase";

class ListRentalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listRentalsUseCase = container.resolve(ListRentalsUseCase);

    const list = await listRentalsUseCase.execute();

    return response.status(200).json(list);
  }
}

export { ListRentalsController };
