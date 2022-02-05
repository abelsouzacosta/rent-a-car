import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/usecases/users/authenticateUser/AuthenticateUserController";

const authenticateRouter = Router();

const auth = new AuthenticateUserController();

authenticateRouter.post("/sessions", auth.handle);

export { authenticateRouter };
