import {
  create,
  list,
  update,
  delete_specification,
} from "@modules/cars/usecases/specifications";
import { Router } from "express";

const specificationRouter = Router();

specificationRouter.post("/", (request, response) => {
  create.handle(request, response);
});

specificationRouter.get("/", (request, response) => {
  list.handle(request, response);
});

specificationRouter.put("/:id", (request, response) => {
  update.handle(request, response);
});

specificationRouter.delete("/:id", (request, response) => {
  delete_specification.handle(request, response);
});

export { specificationRouter };
