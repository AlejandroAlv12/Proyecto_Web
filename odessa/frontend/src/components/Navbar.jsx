import React from "react";
import "./Navbar.css";
import logo from "../assets/logo.png"; // 👈 importa el logo

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo Odessa" />
        <span>ODESSA</span>
      </div>

      <ul className="nav-links">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Lotificaciones</a></li>
        <li><a href="#">Contáctanos</a></li>
        <li><a href="#">Preguntas</a></li>
      </ul>

      <div className="user-icon">
        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" alt="Usuario" />
      </div>
    </nav>
  );
};

export default Navbar;
