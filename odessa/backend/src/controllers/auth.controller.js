const { getPool, sql } = require('../config/db');
const queries = require('../models/sqlQueries');
const { hashPassword, comparePassword } = require('../utils/hash');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const pool = await getPool();

    // comprobar si ya existe el email (evitamos declarar el tipo explícito para prevenir problemas de longitud)
    const existing = await pool.request()
      .input('email', email)
      .query(queries.getUserByEmail);

    if (existing.recordset.length) {
      return res.status(400).json({ message: 'Email ya registrado' });
    }

    const passwordHash = await hashPassword(password);

    // insertar nuevo usuario
    const result = await pool.request()
      .input('username', username)
      .input('email', email)
      .input('passwordHash', passwordHash)
      .query(queries.createUser);

    // depurar la respuesta de la consulta
    console.log('Result from createUser:', {
      recordset: result.recordset,
      rowsAffected: result.rowsAffected
    });

    if (!result.recordset || result.recordset.length === 0) {
      // no se obtuvo el id insertado, devolver 500 con mensaje más claro
      console.error('No se obtuvo id tras INSERT. Resultado completo:', result);
      return res.status(500).json({ message: 'No se pudo crear el usuario (no se obtuvo id)' });
    }

    const id = result.recordset[0].id;
    return res.status(201).json({ id, username, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const pool = await getPool();
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query(queries.getUserByEmail);

    const user = result.recordset[0];
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const match = await comparePassword(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

module.exports = { register, login };
