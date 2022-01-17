import { CreateSepcificationController } from "@cars/usecases/specifications/createSpecification/CreateSpecificationController";
import delete_specification from "@cars/usecases/specifications/deleteSpecification";
import { ListSpecificationsController } from "@modules/cars/usecases/specifications/listSpecifications/ListSpecificationsController";
import { UpdateSpecificationController } from "@modules/cars/usecases/specifications/updateSpecification/UpdateSpecificationController";
import { Router } from "express";

const specificationRouter = Router();

const create = new CreateSepcificationController();
const list = new ListSpecificationsController();
const update = new UpdateSpecificationController();

specificationRouter.post("/", create.handle);

specificationRouter.get("/", list.handle);

specificationRouter.put("/:id", update.handle);

specificationRouter.delete("/:id", (request, response) => {
  delete_specification().handle(request, response);
});

export { specificationRouter };
