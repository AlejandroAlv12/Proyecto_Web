// models/User.js
import { getConnection } from "../db.js";
import bcrypt from "bcryptjs";

/**
 * Helper functions to interact with the Users table (SQL Server).
 * Functions:
 * - findByUsername(username)
 * - findById(id)
 * - createUser({ username, password, email, role })
 */

export async function findByUsername(username) {
	const pool = await getConnection();
	const result = await pool
		.request()
		.input("username", username)
		.query("SELECT * FROM Users WHERE username = @username");
	return result.recordset[0];
}

export async function findById(id) {
	const pool = await getConnection();
	const result = await pool
		.request()
		.input("id", id)
		.query("SELECT * FROM Users WHERE id = @id");
	return result.recordset[0];
}

export async function createUser({ username, password, email = null, role = "user" }) {
	const pool = await getConnection();

	// hashear la contraseña antes de insertar
	const salt = await bcrypt.genSalt(10);
	const hashed = await bcrypt.hash(password, salt);

	await pool
		.request()
		.input("username", username)
		.input("password", hashed)
		.input("email", email)
		.input("role", role)
		.query(
			`INSERT INTO Users (username, password, email, role) VALUES (@username, @password, @email, @role)`
		);

	// devolver el usuario recién creado (consulta por username)
	return await findByUsername(username);
}

export async function comparePassword(plain, hashed) {
	return await bcrypt.compare(plain, hashed);
}

export default { findByUsername, findById, createUser, comparePassword };

