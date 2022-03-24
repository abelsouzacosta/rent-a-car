import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { ApplicationError } from "@shared/errors/ApplicationError";

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
    const { sub: user_id } = verify(serial, auth.secret_token) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new ApplicationError("Invalid Token", 401);
  }
}
