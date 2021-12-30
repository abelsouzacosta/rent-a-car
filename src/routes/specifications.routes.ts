import { create } from "@cars/usecases/specifications/createSpecification";
import { delete_specification } from "@cars/usecases/specifications/deleteSpecification";
import { list } from "@cars/usecases/specifications/listSpecifications";
import { update } from "@cars/usecases/specifications/updateSpecification";
import { Router } from "express";

const specificationRouter = Router();

specificationRouter.post("/", (request, response) => {
  create.handle(request, response);
});

specificationRouter.get("/", (request, response) => {
  list.handle(request, response);
});

specificationRouter.put("/:id", (request, response) => {
  update.handle(request, response);
});

specificationRouter.delete("/:id", (request, response) => {
  delete_specification.handle(request, response);
});

export { specificationRouter };
