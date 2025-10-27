#!/usr/bin/env node
import dotenv from "dotenv";
import { findByUsername, createUser } from "../models/User.js";

dotenv.config();

async function run() {
  const username = process.env.SUPERUSER_USERNAME || "admin";
  const password = process.env.SUPERUSER_PASSWORD || "Admin1234!";
  const email = process.env.SUPERUSER_EMAIL || "admin@example.com";
  const role = process.env.SUPERUSER_ROLE || "admin";

  try {
    const existing = await findByUsername(username);
    if (existing) {
      console.log(`Usuario '${username}' ya existe. No se creó uno nuevo.`);
      console.log("Registro existente:", existing);
      process.exit(0);
    }

    const user = await createUser({ username, password, email, role });
    console.log("Superusuario creado correctamente:", { id: user?.id || "N/A", username: user.username, email: user.email, role });
    process.exit(0);
  } catch (err) {
    console.error("Error al crear superusuario:", err);
    process.exit(1);
  }
}

run();
