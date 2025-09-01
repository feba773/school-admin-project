import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  const dbconnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT), // ✅ ensure number
  });

  try {
    const [results] = await dbconnection.execute(query, values);
    await dbconnection.end(); // ✅ proper closing
    return results;
  } catch (error) {
    console.error("Database Error:", error.message);
    throw Error(error.message);
  }
}
