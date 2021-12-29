import { DeleteSpecificationservice } from "@modules/cars/services/specifications/DeleteSpecificationService";
import { create, list, update } from "@modules/cars/usecases/specifications";
import { Router, Request, Response } from "express";
import { SpecificationRepository } from "src/modules/cars/repositories/specification/SpecificationRepository";

const specificationRouter = Router();
const specificationRepository = new SpecificationRepository();

specificationRouter.post("/", (request, response) => {
  create.handle(request, response);
});

specificationRouter.get("/", (request, response) => {
  list.handle(request, response);
});

specificationRouter.put("/:id", (request, response) => {
  update.handle(request, response);
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
