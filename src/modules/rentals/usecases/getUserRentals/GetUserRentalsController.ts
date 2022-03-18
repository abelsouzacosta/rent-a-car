import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetUserRentalsUseCase } from "./GetUserRentalsUseCase";

class GetUserRentalsControler {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const getUserRentalsUseCase = container.resolve(GetUserRentalsUseCase);

    const list = await getUserRentalsUseCase.execute(user_id);

    return response.status(200).json(list);
  }
}

export { GetUserRentalsControler };
