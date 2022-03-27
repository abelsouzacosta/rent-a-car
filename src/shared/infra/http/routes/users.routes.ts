import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/usecases/users/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/usecases/users/updateUserAvatar/UpdateUserAvatarController";
import { UserProfileController } from "@modules/accounts/usecases/users/userProfile/UserProfileController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const userRouter = Router();
const create = new CreateUserController();
const avatar = new UpdateUserAvatarController();
const profile = new UserProfileController();

const uploadAvatar = multer(uploadConfig);

userRouter.post("/", create.handle);

userRouter.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  avatar.handle
);

userRouter.get("/", ensureAuthenticated, profile.handle);

export { userRouter };
