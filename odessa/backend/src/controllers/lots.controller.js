const { getPool, sql } = require('../config/db');
const queries = require('../models/sqlQueries');

const createLot = async (req, res) => {
  try {
    const { name, location, price, size, description } = req.body;
    const pool = await getPool();
    const result = await pool.request()
      .input('name', sql.VarChar, name)
      .input('location', sql.VarChar, location)
      .input('price', sql.Decimal(18,2), price)
      .input('size', sql.Decimal(18,2), size)
      .input('description', sql.Text, description)
      .query(queries.createLot);

    res.status(201).json({ id: result.recordset[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creando lote' });
  }
};

const getLots = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(queries.getAllLots);
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo lotes' });
  }
};

module.exports = { createLot, getLots };
