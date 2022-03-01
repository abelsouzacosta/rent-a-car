import { Router } from "express";

import { authenticateRouter } from "./authenticate.routes";
import { carRouter } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationRouter } from "./specifications.routes";
import { userRouter } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);

router.use("/specifications", specificationRouter);

router.use("/users", userRouter);

router.use("/cars", carRouter);

router.use(authenticateRouter);

export { router };
