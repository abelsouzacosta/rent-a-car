import { Router } from "express";

import { CreateCarController } from "@modules/cars/usecases/cars/createCar/CreateCarController";
import { ListAvaliableCarsController } from "@modules/cars/usecases/cars/listAvaliableCars/ListCarsController";
import { isAdminMiddleware } from "@shared/infra/http/middlewares/isAdminMiddleware";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carRouter = Router();
const create = new CreateCarController();
const list = new ListAvaliableCarsController();

carRouter.use(ensureAuthenticated);

carRouter.post("/", isAdminMiddleware, create.handle);

carRouter.get("/", list.handle);

export { carRouter };
