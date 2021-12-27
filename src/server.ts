import { categoriesRoutes } from "@routes/categories.routes";
import { specificationRouter } from "@routes/specifications.routes";
import express from "express";

const app = express();

const PORT = 3333;

app.use(express.json());

app.use("/categories", categoriesRoutes);

app.use("/specifications", specificationRouter);

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
