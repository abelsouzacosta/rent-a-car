import express, { Request, Response } from "express";

const app = express();

const PORT = 3333;

app.get("/", (request: Request, response: Response) => {
  return response.status(200).send("Hello World");
});

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
