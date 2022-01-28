import { AuthenticateUserController } from "@modules/accounts/usecases/users/authenticateUser/AuthenticateUserController";
import { Router } from "express";

const authenticateRouter = Router();

const auth = new AuthenticateUserController();

authenticateRouter.post("/sessions", auth.handle);

export { authenticateRouter };
