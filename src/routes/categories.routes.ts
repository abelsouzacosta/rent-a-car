import {
  create,
  list,
  update,
  delete_category,
} from "@cars/usecases/categories";
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
