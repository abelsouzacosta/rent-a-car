import { DeleteSpecificationservice } from "@modules/cars/services/specifications/DeleteSpecificationService";
import { ListSpecificationsService } from "@modules/cars/services/specifications/ListSpecificationsService";
import { UpdateSpecificationService } from "@modules/cars/services/specifications/UpdateSpecificationService";
import { create } from "@modules/cars/usecases/specifications";
import { Router, Request, Response } from "express";
import { SpecificationRepository } from "src/modules/cars/repositories/specification/SpecificationRepository";

const specificationRouter = Router();
const specificationRepository = new SpecificationRepository();

specificationRouter.post("/", (request, response) => {
  create.handle(request, response);
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

specificationRouter.delete("/:id", (request: Request, response: Response) => {
  const { id } = request.params;

  const delete_specification = new DeleteSpecificationservice(
    specificationRepository
  );

  delete_specification.execute({ id });

  return response.status(200).send();
});

export { specificationRouter };
