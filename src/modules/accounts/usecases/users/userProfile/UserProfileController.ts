import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserProfileUseCase } from "./UserProfileUseCase";

class UserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const userProfileUseCase = container.resolve(UserProfileUseCase);

    const user_profile = await userProfileUseCase.execute(id);

    return response.status(200).json({
      user_profile,
    });
  }
}

export { UserProfileController };
