import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/usecases/createRental/CreateRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";

const rentalRouter = Router();
const create = new CreateRentalController();

rentalRouter.use(ensureAuthenticated);

rentalRouter.post("/", isAdminMiddleware, create.handle);

export { rentalRouter };
