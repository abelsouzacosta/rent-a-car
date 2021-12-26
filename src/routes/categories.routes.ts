import { Router, Request, Response } from "express";

import { CategoryRepository } from "../repositories/CategoryRepository";
import { CreateCategoryService } from "../services/categories/CreateCategoryService";
import { ListCategoryService } from "../services/categories/ListCategoriesService";
import { UdpateCategoryRepository } from "../services/categories/UpdateCategoryRepository";

const categoriesRoutes = Router();
const categoryRepository = new CategoryRepository();

categoriesRoutes.post("/", (request: Request, response: Response) => {
  const { name, description } = request.body;

  const create = new CreateCategoryService(categoryRepository);

  create.execute({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request: Request, response: Response) => {
  const list = new ListCategoryService(categoryRepository);

  const categories = list.execute();

  return response.status(200).json(categories);
});

categoriesRoutes.put("/:id", (request: Request, response: Response) => {
  const { id } = request.params;
  const { name, description } = request.body;

  const update = new UdpateCategoryRepository(categoryRepository);

  update.execute({ id, name, description });

  return response.status(200).send();
});

export { categoriesRoutes };
