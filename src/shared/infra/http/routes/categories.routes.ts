import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/usecases/categories/createCategory/CreateCategoryController";
import { DeleteCategoryController } from "@modules/cars/usecases/categories/deleteCategory/DeleteCategoryController";
import { ImportCategoryController } from "@modules/cars/usecases/categories/importCategory/ImportCategoryController";
import { ListCategoryController } from "@modules/cars/usecases/categories/listCategory/ListCategoryController";
import { UpdateCategoryController } from "@modules/cars/usecases/categories/updateCategory/UpdateCategoryController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";

const upload = multer({
  dest: "./tmp",
});

const categoriesRoutes = Router();

const create = new CreateCategoryController();
const list = new ListCategoryController();
const update = new UpdateCategoryController();
const delete_category = new DeleteCategoryController();
const import_category = new ImportCategoryController();

categoriesRoutes.get("/", list.handle);

categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.post("/", isAdminMiddleware, create.handle);

categoriesRoutes.put("/:id", isAdminMiddleware, update.handle);

categoriesRoutes.delete("/:id", isAdminMiddleware, delete_category.handle);

categoriesRoutes.post(
  "/import",
  isAdminMiddleware,
  upload.single("file"),
  import_category.handle
);

export { categoriesRoutes };
