import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/usecases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/usecases/devolutionRental/DevolutionRentalController";
import { GetUserRentalsControler } from "@modules/rentals/usecases/getUserRentals/GetUserRentalsController";
import { ListRentalsController } from "@modules/rentals/usecases/listRentals/ListRentalsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";

const rentalRouter = Router();
const create = new CreateRentalController();
const list = new ListRentalsController();
const devolution = new DevolutionRentalController();
const listByUser = new GetUserRentalsControler();

rentalRouter.use(ensureAuthenticated);

rentalRouter.post("/", create.handle);

rentalRouter.get("/all", listByUser.handle);

rentalRouter.get("/", isAdminMiddleware, list.handle);

rentalRouter.patch("/:id", devolution.handle);

export { rentalRouter };
