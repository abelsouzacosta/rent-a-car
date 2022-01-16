import delete_category from "@cars/usecases/categories/deleteCategory";
import update from "@cars/usecases/categories/updateCategory";
import { CreateCategoryController } from "@modules/cars/usecases/categories/createCategory/CreateCategoryController";
import import_category from "@modules/cars/usecases/categories/importCategory";
import { ListCategoryController } from "@modules/cars/usecases/categories/listCategory/ListCategoryController";
import { Router } from "express";
import multer from "multer";

const upload = multer({
  dest: "./tmp",
});

const categoriesRoutes = Router();

const create = new CreateCategoryController();
const list = new ListCategoryController();

categoriesRoutes.post("/", create.handle);

categoriesRoutes.get("/", list.handle);

categoriesRoutes.put("/:id", (request, response) => {
  update().handle(request, response);
});

categoriesRoutes.delete("/:id", (request, response) => {
  delete_category().handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  import_category().handle(request, response);
});

export { categoriesRoutes };
