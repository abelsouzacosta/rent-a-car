import { Router } from "express";

import { CreateCarController } from "@modules/cars/usecases/cars/createCar/CreateCarController";
import { ListCarsController } from "@modules/cars/usecases/cars/listCars/ListCarsController";
import { isAdminMiddleware } from "@shared/infra/http/middlewares/isAdminMiddleware";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carRouter = Router();
const create = new CreateCarController();
const list = new ListCarsController();

carRouter.use(ensureAuthenticated);

carRouter.post("/", isAdminMiddleware, create.handle);

carRouter.get("/", list.handle);

export { carRouter };
