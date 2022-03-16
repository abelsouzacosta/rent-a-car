import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { expected_return_date, car_id, user_id } = request.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    await createRentalUseCase.execute({
      expected_return_date,
      car_id,
      user_id,
    });

    return response.status(201).send();
  }
}

export { CreateRentalController };
