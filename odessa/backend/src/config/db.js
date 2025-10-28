const sql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: false, // true si usas Azure
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  }
};

async function getPool() {
  if (!global._mssqlPool) {
    global._mssqlPool = await sql.connect(config);
  }
  return global._mssqlPool;
}

module.exports = { sql, getPool };
