import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/usecases/createRental/CreateRentalController";
import { ListRentalsController } from "@modules/rentals/usecases/listRentals/ListRentalsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";

const rentalRouter = Router();
const create = new CreateRentalController();
const list = new ListRentalsController();

rentalRouter.use(ensureAuthenticated);

rentalRouter.post("/", create.handle);

rentalRouter.get("/", isAdminMiddleware, list.handle);

export { rentalRouter };
