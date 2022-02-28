import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { ApplicationError } from "@errors/ApplicationError";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new ApplicationError("Token not provided", 401);

  const token = authHeader.split(" ");

  if (token.length !== 2) throw new ApplicationError("Token malformatted", 401);

  const [, serial] = token;

  try {
    const { sub: user_id } = verify(
      serial,
      "907e7177676d8efa02a19f29ceeaf81d"
    ) as IPayload;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(user_id);

    if (!user) throw new ApplicationError("User not exists!", 401);

    request.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    throw new ApplicationError("Invalid Token", 401);
  }
}
