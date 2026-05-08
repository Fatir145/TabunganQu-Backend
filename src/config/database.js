const mysql = require('mysql2/promise');

const pool = mysql.createPool(process.env.DATABASE_URL);

const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected via pool");
    
    // Auto-migrate avatar column to LONGTEXT to support Base64 without crashing
    try {
      await connection.query('ALTER TABLE users MODIFY COLUMN avatar LONGTEXT NULL');
      console.log("✅ Avatar column migration successful");
    } catch (migErr) {
      console.log("⚠️ Migration info:", migErr.message);
    }
    
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

const getDB = () => {
  return pool;
};

const testConnection = async () => {
  await connectDB();
};

module.exports = {
  pool,
  connectDB,
  testConnection,
  getDB
};