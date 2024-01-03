import mysql, { Connection } from "mysql2/promise";

let connection: Connection | null = null;

export async function getConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "porgetto_prova1",
    });
  }
  return connection;
}
