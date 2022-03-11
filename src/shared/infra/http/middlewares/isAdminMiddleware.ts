import { NextFunction, Request, Response } from "express";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { ApplicationError } from "@shared/errors/ApplicationError";

export async function isAdminMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const repository = new UserRepository();

  const user = await repository.findById(id);

  if (!user) throw new ApplicationError("User not found", 404);

  if (!user.isAdmin)
    throw new ApplicationError(
      "Unauthorized: user does not have an admin permission",
      401
    );

  return next();
}
