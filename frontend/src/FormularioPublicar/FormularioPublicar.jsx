import React, { useState } from 'react';
import './FormularioPublicar.css';
import { API_URL } from '../api';

const FormularioPublicacion = () => {
  const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

  const [datosCasa, setDatosCasa] = useState({
    ciudad: '',
    ubicacion: '',
    habitaciones: '',
    banos: '',
    telefono: '',
    tipo: '',
    imagen: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosCasa({
      ...datosCasa,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append('ciudad',       datosCasa.ciudad);
    formData.append('ubicacion',    datosCasa.ubicacion);
    formData.append('habitaciones', datosCasa.habitaciones);
    formData.append('banos',        datosCasa.banos);
    formData.append('telefono',     datosCasa.telefono);
    formData.append('tipo',         datosCasa.tipo);
    formData.append('propietario',  usuarioActivo?.usuario || 'Anónimo');
    formData.append('imagen',       datosCasa.imagen); // el archivo real

    const respuesta = await fetch(`${API_URL}/propiedades/guardar`, {
      method: 'POST',
      body: formData  // sin headers Content-Type, el navegador lo pone solo
    });

    if (!respuesta.ok) throw new Error('Error al guardar la propiedad');

    alert('¡Propiedad publicada con éxito!');
    setDatosCasa({
      ciudad: '', ubicacion: '', habitaciones: '',
      banos: '', telefono: '', tipo: '', imagen: null
    });

  } catch (err) {
    alert('Ocurrió un error: ' + err.message);
  }
};

  return (
    <div className="contenedor-formulario">
      <h2>Publicar Nueva Vivienda</h2>

      <form onSubmit={handleSubmit} className="form-publicar">

        {/* 1. Ciudad */}
        <div className="grupo-input">
          <label>Ciudad:</label>
          <select
            name="ciudad"
            value={datosCasa.ciudad}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione una ciudad...</option>
            <option value="Medellin">Medellín</option>
            <option value="Bogota">Bogotá</option>
            <option value="Cartagena">Cartagena</option>
            <option value="Santa Marta">Santa Marta</option>
            <option value="Cali">Cali</option>
            <option value="Barranquilla">Barranquilla</option>
            <option value="Bucaramanga">Bucaramanga</option>
          </select>
        </div>

        {/* 2. Zona o Ubicación */}
        <div className="grupo-input">
          <label>Zona o Ubicación exacta:</label>
          <input
            type="text"
            name="ubicacion"
            placeholder="Ej: El Poblado, Chapinero..."
            value={datosCasa.ubicacion}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* 3. Habitaciones y Baños */}
        <div className="fila-inputs">
          <div className="grupo-input">
            <label>Habitaciones:</label>
            <input
              type="number"
              name="habitaciones"
              min="1"
              value={datosCasa.habitaciones}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grupo-input">
            <label>Baños:</label>
            <input
              type="number"
              name="banos"
              min="1"
              value={datosCasa.banos}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* 4. Teléfono */}
        <div className="grupo-input">
          <label>Número de teléfono del propietario:</label>
          <input
            type="tel"
            name="telefono"
            placeholder="Ej: +57 300 123 4567"
            value={datosCasa.telefono}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* 5. Tipo — Renta o Venta */}
        <div className="grupo-input">
          <label>Tipo de oferta:</label>
          <select
            name="tipo"
            value={datosCasa.tipo}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione...</option>
            <option value="Renta">Renta</option>
            <option value="Venta">Venta</option>
          </select>
        </div>

        {/* 6. Imagen */}
        <div className="grupo-input">
          <label>Imagen de la casa:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setDatosCasa({ ...datosCasa, imagen: e.target.files[0] })}
            required
                  />
        </div>

        <button type="submit" className="btn-publicar">Publicar Propiedad</button>
      </form>
    </div>
  );
};

export default FormularioPublicacion;