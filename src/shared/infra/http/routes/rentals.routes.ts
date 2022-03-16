import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/usecases/createRental/CreateRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRouter = Router();
const create = new CreateRentalController();

rentalRouter.use(ensureAuthenticated);

rentalRouter.post("/", create.handle);

export { rentalRouter };
