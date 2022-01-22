import { CreateUserController } from "@modules/accounts/usecases/users/createUser/CreateUserController";
import { Router } from "express";

const userRouter = Router();
const create = new CreateUserController();

userRouter.post("/", create.handle);

export { userRouter };
