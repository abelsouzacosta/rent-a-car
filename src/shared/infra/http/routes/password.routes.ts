import { Router } from "express";

import { SendForgotPasswordController } from "@modules/accounts/usecases/users/sendForgotPasswordMail/SendForgotPasswordController";

const passwordRouter = Router();
const forgot = new SendForgotPasswordController();

passwordRouter.post("/forgot", forgot.handle);

export { passwordRouter };
