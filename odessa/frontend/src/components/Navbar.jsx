import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import userIcon from "../assets/user-icon.png"; 
import Login from "./Login"; 

const Navbar = () => {
  const [mostrarLogin, setMostrarLogin] = useState(false); 

  const toggleLogin = () => {
    setMostrarLogin(!mostrarLogin);
  };

  return (
    <>
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

        <div className="user-icon" onClick={toggleLogin}>
          <img src={userIcon} alt="Usuario" />
        </div>
      </nav>

      {mostrarLogin && <Login onClose={toggleLogin} />}
    </>
  );
};

export default Navbar;
