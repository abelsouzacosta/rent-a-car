import { Router } from "express";

import { CreateSepcificationController } from "@modules/cars/usecases/specifications/createSpecification/CreateSpecificationController";
import { DeleteSpecificationController } from "@modules/cars/usecases/specifications/deleteSpecification/DeleteSpecificationController";
import { ListSpecificationsController } from "@modules/cars/usecases/specifications/listSpecifications/ListSpecificationsController";
import { UpdateSpecificationController } from "@modules/cars/usecases/specifications/updateSpecification/UpdateSpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";

const specificationRouter = Router();

const create = new CreateSepcificationController();
const list = new ListSpecificationsController();
const update = new UpdateSpecificationController();
const delete_specification = new DeleteSpecificationController();

specificationRouter.get("/", list.handle);

specificationRouter.use(ensureAuthenticated);

specificationRouter.post("/", isAdminMiddleware, create.handle);

specificationRouter.put("/:id", isAdminMiddleware, update.handle);

specificationRouter.delete(
  "/:id",
  isAdminMiddleware,
  delete_specification.handle
);

export { specificationRouter };
