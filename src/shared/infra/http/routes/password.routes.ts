import { Router } from "express";

import { ResetPasswordUserController } from "@modules/accounts/usecases/users/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordController } from "@modules/accounts/usecases/users/sendForgotPasswordMail/SendForgotPasswordController";

const passwordRouter = Router();
const forgot = new SendForgotPasswordController();
const reset = new ResetPasswordUserController();

passwordRouter.post("/forgot", forgot.handle);
passwordRouter.post("/reset", reset.handle);

export { passwordRouter };
