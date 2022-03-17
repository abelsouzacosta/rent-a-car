import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, password, email, driver_license, "isAdmin", created_at)
    VALUES('${id}', 'admin', '${password}', 'admin@rentx.com', '90909898', true, 'now()')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new category instance", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Integration Test Category",
        description: "Category supertest",
      })
      .set({ Authorization: `Bearer: ${token}` });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create an category with a name already taken", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Test Category",
        description: "Category supertest",
      })
      .set({ Authorization: `Bearer: ${token}` });

    const secondResponse = await request(app)
      .post("/categories")
      .send({
        name: "Test Category",
        description: "Category supertest",
      })
      .set({ Authorization: `Bearer: ${token}` });

    expect(response.status).toBe(201);
    expect(secondResponse.status).toBe(409);
  });
});
