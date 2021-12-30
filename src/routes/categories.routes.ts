import { create } from "@cars/usecases/categories/createCategory";
import { delete_category } from "@cars/usecases/categories/deleteCategory";
import { list } from "@cars/usecases/categories/listCategory";
import { update } from "@cars/usecases/categories/updateCategory";
import { import_category } from "@modules/cars/usecases/categories/importCategory";
import { Router } from "express";
import multer from "multer";

const upload = multer({
  dest: "./tmp",
});

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
  create.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  list.handle(request, response);
});

categoriesRoutes.put("/:id", (request, response) => {
  update.handle(request, response);
});

categoriesRoutes.delete("/:id", (request, response) => {
  delete_category.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  import_category.handle(request, response);
});

export { categoriesRoutes };
