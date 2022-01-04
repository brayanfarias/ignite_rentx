import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "service_database_rentx"): Promise<Connection> => {
  const defaultOption = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOption, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database:
        process.env.NODE_ENV === "test" ? "rentx_test" : defaultOption.database,
    })
  );
};
