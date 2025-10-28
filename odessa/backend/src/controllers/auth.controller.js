const { getPool, sql } = require('../config/db');
const queries = require('../models/sqlQueries');
const { hashPassword, comparePassword } = require('../utils/hash');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const pool = await getPool();

    // chequear usuario existente
    const existing = await pool.request()
      .input('email', sql.VarChar, email)
      .query(queries.getUserByEmail);

    if (existing.recordset.length) {
      return res.status(400).json({ message: 'Email ya registrado' });
    }

    const passwordHash = await hashPassword(password);

    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('email', sql.VarChar, email)
      .input('passwordHash', sql.VarChar, passwordHash)
      .query(queries.createUser);

    const id = result.recordset[0].id;
    res.status(201).json({ id, username, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en registro' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const pool = await getPool();

    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query(queries.getUserByEmail);

    const user = result.recordset[0];
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const match = await comparePassword(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });

    // Opción recomendada: setear cookie httpOnly (seguro). Alternativa: devolver token y guardar en frontend.
    // Aquí devolvemos token en JSON (para simplicidad). Si quieres cookie, comentamos otra opción.
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en login' });
  }
};

module.exports = { register, login };
