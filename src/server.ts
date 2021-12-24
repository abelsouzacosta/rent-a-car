import express, { Request, Response } from "express";

const app = express();

const PORT = 3333;

app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  return response.status(200).json({
    message: "Olá mundo",
  });
});

app.post("/courses", (request, response) => {
  const { name } = request.body;

  return response.status(200).json({ name });
});

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
