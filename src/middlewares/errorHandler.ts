import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "src/errors/ApplicationError";

import "express-async-errors";

export default (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof ApplicationError) {
    const file = error.fileName.slice(error.dirName.length + 1);

    return response.status(error.status).json({
      message: error.message,
      at: file,
      status: "error",
    });
  }

  return response.status(500).json({
    message: "Server error",
  });
};
