import mysql from 'mysql2/promise';

export async function query({ query, values = [] }) {
  // Connect to the database using the credentials from your .env.local file
  const dbconnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    // Run the SQL query
    const [results] = await dbconnection.execute(query, values);
    // Close the connection
    dbconnection.end();
    // Return the results
    return results;
  } catch (error) {
    // If there's an error, log it and throw an error
    throw Error(error.message);
  }
}