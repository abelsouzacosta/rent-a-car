import { ListSpecificationsService } from "@modules/cars/services/specifications/ListSpecificationsService";
import { UpdateSpecificationService } from "@modules/cars/services/specifications/UpdateSpecificationService";
import { Router, Request, Response } from "express";
import { SpecificationRepository } from "src/modules/cars/repositories/specification/SpecificationRepository";
import { CreateSpecificationService } from "src/modules/cars/services/specifications/CreateSpecificationService";

const specificationRouter = Router();
const specificationRepository = new SpecificationRepository();

specificationRouter.post("/", (request: Request, response: Response) => {
  const { name, description } = request.body;

  const create = new CreateSpecificationService(specificationRepository);

  create.execute({ name, description });

  return response.status(201).send();
});

specificationRouter.get("/", (request: Request, response: Response) => {
  const list = new ListSpecificationsService(specificationRepository);

  const specifications = list.execute();

  return response.status(200).json(specifications);
});

specificationRouter.put("/:id", (request: Request, response: Response) => {
  const { id } = request.params;
  const { name, description } = request.body;

  const update = new UpdateSpecificationService(specificationRepository);

  update.execute({ id, name, description });

  return response.status(200).send();
});

export { specificationRouter };
