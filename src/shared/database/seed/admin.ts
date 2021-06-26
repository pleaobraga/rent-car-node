import { hash } from "bcrypt"
import { v4 } from "uuid"

import createConection from ".."

async function create() {
  const connection = await createConection("localhost")

  const id = v4()
  const password = await hash("admin", 8)

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentex.com.br', '${password}', true, 'now()', 'XXXXXX')`
  )

  await connection.close
}

create().then(() => console.log("User admin created"))
