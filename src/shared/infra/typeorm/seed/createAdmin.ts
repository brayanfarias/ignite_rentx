import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

import createConnection from "../index";

async function createAdmin() {
  const connection = await createConnection();

  const id = uuid();
  const pw = hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES('${id}', 'admin', 'admin@admin.com.br', '${pw}', true, 'now()', '123456789')
        `
  );
}

createAdmin().then(() => console.log("Admin created!"));
