import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSepcificationController } from "../modules/cars/usecases/specifications/createSpecification/CreateSpecificationController";
import { DeleteSpecificationController } from "../modules/cars/usecases/specifications/deleteSpecification/DeleteSpecificationController";
import { ListSpecificationsController } from "../modules/cars/usecases/specifications/listSpecifications/ListSpecificationsController";
import { UpdateSpecificationController } from "../modules/cars/usecases/specifications/updateSpecification/UpdateSpecificationController";

const specificationRouter = Router();

const create = new CreateSepcificationController();
const list = new ListSpecificationsController();
const update = new UpdateSpecificationController();
const delete_specification = new DeleteSpecificationController();

specificationRouter.use(ensureAuthenticated);

specificationRouter.post("/", create.handle);

specificationRouter.get("/", list.handle);

specificationRouter.put("/:id", update.handle);

specificationRouter.delete("/:id", delete_specification.handle);

export { specificationRouter };
