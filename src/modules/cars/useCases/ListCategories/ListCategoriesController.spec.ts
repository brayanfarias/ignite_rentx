import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List Categories Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const pw = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES('${id}', 'admin', 'admin@admin.com.br', '${pw}', true, 'now()', '123456789')
        `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      password: "admin",
      email: "admin@admin.com.br",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Super Test Name",
        description: "Category Super Test Description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get("/categories/");

    expect(response.status).toBe(200);
    expect(response.body[0].name).toEqual("Category Super Test Name");
    expect(response.body.length).toBe(1);
  });
});
