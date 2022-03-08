import "reflect-metadata";
import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import errorHandler from "@shared/infra/http/middlewares/errorHandler";
import createConnection from "@shared/infra/typeorm";
import "@shared/container";

import { router } from "./shared/infra/http/routes";
import swaggerFile from "./swagger.json";

createConnection();
const app = express();

const PORT = 3333;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
