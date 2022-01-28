import { CreateUserController } from "@modules/accounts/usecases/users/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/usecases/users/updateUserAvatar/UpdateUserAvatarController";
import { Router } from "express";
import multer from "multer";
import uploadConfig from "src/config/upload";
import { ensureAuthenticated } from "src/middlewares/ensureAuthenticated";

const userRouter = Router();
const create = new CreateUserController();
const avatar = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

userRouter.post("/", create.handle);

userRouter.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  avatar.handle
);

export { userRouter };
