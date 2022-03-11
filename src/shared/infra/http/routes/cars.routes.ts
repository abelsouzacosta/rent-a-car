import { Router } from "express";

import { CreateCarController } from "@modules/cars/usecases/cars/createCar/CreateCarController";
import { isAdminMiddleware } from "@shared/infra/http/middlewares/isAdminMiddleware";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carRouter = Router();
const create = new CreateCarController();

carRouter.use(ensureAuthenticated);

carRouter.post("/", isAdminMiddleware, create.handle);

export { carRouter };
