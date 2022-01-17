import { CreateSepcificationController } from "@cars/usecases/specifications/createSpecification/CreateSpecificationController";
import delete_specification from "@cars/usecases/specifications/deleteSpecification";
import list from "@cars/usecases/specifications/listSpecifications";
import update from "@cars/usecases/specifications/updateSpecification";
import { Router } from "express";

const specificationRouter = Router();

const create = new CreateSepcificationController();

specificationRouter.post("/", create.handle);

specificationRouter.get("/", (request, response) => {
  list().handle(request, response);
});

specificationRouter.put("/:id", (request, response) => {
  update().handle(request, response);
});

specificationRouter.delete("/:id", (request, response) => {
  delete_specification().handle(request, response);
});

export { specificationRouter };
