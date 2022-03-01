import { Router } from "express";

import { CreateCarController } from "@modules/cars/usecases/cars/createCar/CreateCarController";

const carRouter = Router();
const create = new CreateCarController();

carRouter.post("/", create.handle);

export { carRouter };
