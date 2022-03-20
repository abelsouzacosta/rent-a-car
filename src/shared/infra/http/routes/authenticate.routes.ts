import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/usecases/users/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/usecases/users/refreshToken/RefreshTokenController";

const authenticateRouter = Router();

const auth = new AuthenticateUserController();
const refresh = new RefreshTokenController();

authenticateRouter.post("/sessions", auth.handle);

authenticateRouter.post("/refresh-token", refresh.handle);

export { authenticateRouter };
