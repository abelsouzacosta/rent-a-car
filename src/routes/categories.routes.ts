import { Router, Request, Response } from "express";

import { CategoryRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoryRepository = new CategoryRepository();

categoriesRoutes.post("/", (request: Request, response: Response) => {
  const { name, description } = request.body;

  categoryRepository.create({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request: Request, response: Response) => {
  const list = categoryRepository.list();

  return response.status(200).json(list);
});

export { categoriesRoutes };
