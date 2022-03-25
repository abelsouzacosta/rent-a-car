import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/usecases/users/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/usecases/users/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const userRouter = Router();
const create = new CreateUserController();
const avatar = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig);

userRouter.post("/", create.handle);

userRouter.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  avatar.handle
);

export { userRouter };
