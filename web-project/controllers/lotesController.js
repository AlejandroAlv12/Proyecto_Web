// controllers/lotesController.js
import { getConnection } from "../db.js";

export async function getLotes(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Lotes");
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener lotes" });
  }
}

export async function createLote(req, res) {
  const { nombre, superficie, precio, disponible } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", nombre)
      .input("superficie", superficie)
      .input("precio", precio)
      .input("disponible", disponible)
      .query(
        "INSERT INTO Lotes (nombre, superficie, precio, disponible) VALUES (@nombre, @superficie, @precio, @disponible)"
      );
    res.json({ message: "Lote creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear lote" });
  }
}
