import { SpecificationRepository } from "@repositories/specification/SpecificationRepository";
import { CreateSpecificationService } from "@services/specifications/CreateSpecificationService";
import { Router, Request, Response } from "express";

const specificationRouter = Router();
const specificationRepository = new SpecificationRepository();

specificationRouter.post("/", (request: Request, response: Response) => {
  const { name, description } = request.body;

  const create = new CreateSpecificationService(specificationRepository);

  create.execute({ name, description });

  return response.status(201).send();
});

export { specificationRouter };
