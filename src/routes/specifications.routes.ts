import { CreateSepcificationController } from "@cars/usecases/specifications/createSpecification/CreateSpecificationController";
import delete_specification from "@cars/usecases/specifications/deleteSpecification";
import update from "@cars/usecases/specifications/updateSpecification";
import { ListSpecificationsController } from "@modules/cars/usecases/specifications/listSpecifications/ListSpecificationsController";
import { Router } from "express";

const specificationRouter = Router();

const create = new CreateSepcificationController();
const list = new ListSpecificationsController();

specificationRouter.post("/", create.handle);

specificationRouter.get("/", list.handle);

specificationRouter.put("/:id", (request, response) => {
  update().handle(request, response);
});

specificationRouter.delete("/:id", (request, response) => {
  delete_specification().handle(request, response);
});

export { specificationRouter };
