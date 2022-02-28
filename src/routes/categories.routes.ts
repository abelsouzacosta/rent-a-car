import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateCategoryController } from "../modules/cars/usecases/categories/createCategory/CreateCategoryController";
import { DeleteCategoryController } from "../modules/cars/usecases/categories/deleteCategory/DeleteCategoryController";
import { ImportCategoryController } from "../modules/cars/usecases/categories/importCategory/ImportCategoryController";
import { ListCategoryController } from "../modules/cars/usecases/categories/listCategory/ListCategoryController";
import { UpdateCategoryController } from "../modules/cars/usecases/categories/updateCategory/UpdateCategoryController";

const upload = multer({
  dest: "./tmp",
});

const categoriesRoutes = Router();

const create = new CreateCategoryController();
const list = new ListCategoryController();
const update = new UpdateCategoryController();
const delete_category = new DeleteCategoryController();
const import_category = new ImportCategoryController();

categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.post("/", create.handle);

categoriesRoutes.get("/", list.handle);

categoriesRoutes.put("/:id", update.handle);

categoriesRoutes.delete("/:id", delete_category.handle);

categoriesRoutes.post("/import", upload.single("file"), import_category.handle);

export { categoriesRoutes };
