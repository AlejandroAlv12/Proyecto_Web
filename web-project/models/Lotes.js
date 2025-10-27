// models/Lotes.js
import { getConnection } from "../db.js";

/**
 * Helpers para la tabla Lotes.
 * - getAllLotes()
 * - createLote({ nombre, superficie, precio, disponible })
 */

export async function getAllLotes() {
	const pool = await getConnection();
	const result = await pool.request().query("SELECT * FROM Lotes");
	return result.recordset;
}

export async function createLote({ nombre, superficie, precio, disponible = 1 }) {
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
	// devolver lista actualizada (opcional)
	return await getAllLotes();
}

export default { getAllLotes, createLote };

