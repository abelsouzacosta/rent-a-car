import { Request, Response } from "express";

interface IController {
  handle(request: Request, response: Response): Response;
}

export { IController };
