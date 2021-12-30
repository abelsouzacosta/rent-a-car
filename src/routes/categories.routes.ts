import { create } from "@cars/usecases/categories/createCategory";
import { delete_category } from "@cars/usecases/categories/deleteCategory";
import { list } from "@cars/usecases/categories/listCategory";
import { update } from "@cars/usecases/categories/updateCategory";
import { Router } from "express";

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

export { categoriesRoutes };
