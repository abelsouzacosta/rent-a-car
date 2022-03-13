import { Router } from "express";

import { CreateCarSpecificationController } from "@modules/cars/usecases/cars_specification/createCarSpecification/CreateCarSpecificationController";
import { CreateCarController } from "@modules/cars/usecases/cars/createCar/CreateCarController";
import { ListAvaliableCarsController } from "@modules/cars/usecases/cars/listAvaliableCars/ListCarsController";
import { isAdminMiddleware } from "@shared/infra/http/middlewares/isAdminMiddleware";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carRouter = Router();
const create = new CreateCarController();
const list = new ListAvaliableCarsController();
const createSpecification = new CreateCarSpecificationController();

carRouter.use(ensureAuthenticated);

carRouter.post("/", isAdminMiddleware, create.handle);

carRouter.get("/", list.handle);

carRouter.post("/assign", createSpecification.handle);

export { carRouter };
