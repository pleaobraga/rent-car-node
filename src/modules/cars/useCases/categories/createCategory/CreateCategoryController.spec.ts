import { hash } from "bcrypt"
import request from "supertest"
import { Connection } from "typeorm"
import { v4 } from "uuid"

import createConnection from "../../../../../shared/database"
import { app } from "../../../../../shared/infra/http/app"

let connection: Connection
const email = "admin@rentex.com.br"
const password = "admin"

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = v4()
    const passwordEncrypted = await hash("admin", 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin','${email}', '${passwordEncrypted}', true, 'now()', 'XXXXXX')`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it("should be able to crate a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email,
      password,
    })

    const { refresh_token } = responseToken.body

    const resp = await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Description supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      })

    expect(resp.status).toBe(201)
  })

  it("should not be able to crate a new category with same name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email,
      password,
    })

    const { refresh_token } = responseToken.body

    const resp = await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Description supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      })

    expect(resp.status).toBe(403)
  })
})
