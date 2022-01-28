import { UserRepository } from "@modules/accounts/repositories/implementations/UserRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new Error("Token not provided");

  const token = authHeader.split(" ");

  if (token.length !== 2) throw new Error("Token malformatted");

  const [, serial] = token;

  try {
    const { sub: user_id } = verify(
      serial,
      "907e7177676d8efa02a19f29ceeaf81d"
    ) as IPayload;

    const userRepository = new UserRepository();

    const user = userRepository.findById(user_id);

    if (!user) throw new Error("User not exists!");

    next();
  } catch (error) {
    throw new Error("Invalid Token");
  }
}
