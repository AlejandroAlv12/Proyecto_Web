import React from "react";
import "./Login.css";

const Login = ({ onClose }) => {
  return (
    <div className="login-overlay">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button>Entrar</button>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Login;
