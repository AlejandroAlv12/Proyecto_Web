// controllers/authController.js
import { getConnection } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("username", username)
      .query("SELECT * FROM Users WHERE username = @username");

    if (result.recordset.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
