import { Router, Request, Response } from "express";

import { Category } from "../models/Category";

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post("/", (request: Request, response: Response) => {
  const { name, description } = request.body;

  const category = new Category();

  Object.assign(category, {
    name,
    description,
    createdAt: new Date(),
  });

  categories.push(category);

  return response.status(201).send();
});

categoriesRoutes.get("/", (request: Request, response: Response) => {
  return response.status(200).json(categories);
});

export { categoriesRoutes };
