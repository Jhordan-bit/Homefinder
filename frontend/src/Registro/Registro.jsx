import React, { useState } from 'react';
import './Registro.css';
import { API_URL } from '../api';

const Registro = ({ onRegistroExitoso }) => {
  const [datosRegistro, setDatosRegistro] = useState({
    usuario: '',
    contrasena: ''
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosRegistro({
      ...datosRegistro,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (datosRegistro.contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      // --- Conectar con Spring Boot ---
      const respuesta = await fetch(`${API_URL}/auth/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosRegistro)
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.mensaje || 'Error al registrarse');
      onRegistroExitoso();

      // --- Simulación temporal (quitar cuando conectes el backend) ---
      console.log("Registrando usuario:", datosRegistro);
      alert(`¡Usuario "${datosRegistro.usuario}" registrado con éxito! Ahora inicia sesión.`);
      onRegistroExitoso();

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="contenedor-auth">
      <h2>Crear Cuenta</h2>

      <form onSubmit={handleSubmit} className="form-auth">

        <div className="grupo-input">
          <label>Usuario:</label>
          <input
            type="text"
            name="usuario"
            placeholder="Elige un nombre de usuario"
            value={datosRegistro.usuario}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grupo-input">
          <label>Contraseña:</label>
          <input
            type="password"
            name="contrasena"
            placeholder="Mínimo 6 caracteres"
            value={datosRegistro.contrasena}
            onChange={handleInputChange}
            required
          />
        </div>

        {error && <p className="mensaje-error">{error}</p>}

        <button type="submit" className="btn-auth">Registrarse</button>

      </form>
    </div>
  );
};

export default Registro;