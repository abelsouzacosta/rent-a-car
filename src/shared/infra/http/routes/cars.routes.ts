import { Router } from "express";
import multer from "multer";

import upload from "@config/upload";
import { UploadCarImagesController } from "@modules/cars/usecases/cars_images/UploadCarImagesController";
import { CreateCarSpecificationController } from "@modules/cars/usecases/cars_specification/createCarSpecification/CreateCarSpecificationController";
import { CreateCarController } from "@modules/cars/usecases/cars/createCar/CreateCarController";
import { ListAvaliableCarsController } from "@modules/cars/usecases/cars/listAvaliableCars/ListCarsController";
import { isAdminMiddleware } from "@shared/infra/http/middlewares/isAdminMiddleware";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const uploadFile = multer(upload);

const carRouter = Router();
const create = new CreateCarController();
const list = new ListAvaliableCarsController();
const createSpecification = new CreateCarSpecificationController();
const uploadCarImages = new UploadCarImagesController();

carRouter.get("/", list.handle);

carRouter.use(ensureAuthenticated);

carRouter.post("/", isAdminMiddleware, create.handle);

carRouter.post("/assign", createSpecification.handle);

carRouter.post(
  "/images/:id",
  isAdminMiddleware,
  uploadFile.array("images"),
  uploadCarImages.handle
);

export { carRouter };
