import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/usecases/rentals/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/usecases/rentals/devolutionRental/DevolutionRentalController";
import { GetUserRentalsControler } from "@modules/rentals/usecases/rentals/getUserRentals/GetUserRentalsController";
import { ListRentalsController } from "@modules/rentals/usecases/rentals/listRentals/ListRentalsController";

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
