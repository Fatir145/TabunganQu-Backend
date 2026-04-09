const mysql = require('mysql2/promise');

let connection;

const connectDB = async () => {
  try {
    connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

const testConnection = async () => {
  await connectDB();
};

module.exports = {
  connection,
  testConnection
};