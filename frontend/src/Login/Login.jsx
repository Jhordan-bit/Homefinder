import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLoginExitoso }) => {
  const [datosLogin, setDatosLogin] = useState({
    usuario: '',
    contrasena: ''
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosLogin({
      ...datosLogin,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const respuesta = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosLogin)
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.mensaje || 'Credenciales incorrectas');
      localStorage.setItem('usuarioActivo', JSON.stringify(datos));
      onLoginExitoso(datos);

      // --- Simulación temporal (quitar cuando conectes el backend) ---
      console.log("Intentando login con:", datosLogin);
      const usuarioSimulado = { usuario: datosLogin.usuario, id: 1 };
      localStorage.setItem('usuarioActivo', JSON.stringify(usuarioSimulado));
      onLoginExitoso(usuarioSimulado);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="contenedor-auth">
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} className="form-auth">

        <div className="grupo-input">
          <label>Usuario:</label>
          <input
            type="text"
            name="usuario"
            placeholder="Tu nombre de usuario"
            value={datosLogin.usuario}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grupo-input">
          <label>Contraseña:</label>
          <input
            type="password"
            name="contrasena"
            placeholder="Tu contraseña"
            value={datosLogin.contrasena}
            onChange={handleInputChange}
            required
          />
        </div>

        {error && <p className="mensaje-error">{error}</p>}

        <button type="submit" className="btn-auth">Iniciar Sesión</button>

      </form>
    </div>
  );
};

export default Login;