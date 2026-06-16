//Funcion de scroll de imagenes en el div del App
import './Scroll.css'
import casaBogota from '../assets/casabog.jpg';
import casaMedellin from '../assets/casamede.jpg';
import casaSantaMarta from '../assets/casasm.jpg';
import casaCartagena from '../assets/casacar.jpg';
import React, { useState } from 'react';


const ScrollImagenes = () => {
  const imagenes = [casaBogota, casaMedellin, casaSantaMarta, casaCartagena];
  const ciudades = ['Bogotá', 'Medellín', 'Santa Marta', 'Cartagena'];
  
  // Estado para saber qué imagen está activa (empieza en la posición 0)
  const [indiceActual, setIndiceActual] = useState(0);

  // Función para ir a la imagen anterior
  const imagenAnterior = () => {
    setIndiceActual((prevIndex) => 
      prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1
    );
  };

  // Función para ir a la siguiente imagen
  const imagenSiguiente = () => {
    setIndiceActual((prevIndex) => 
      prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div style={styles.seccionContenedor}>
      
      {/* SECCIÓN IZQUIERDA: EL TEXTO */}
      <div style={styles.bloqueTexto}>
        <p>
          Aquí puede hacer observacion acerca del tipo de residencias que usted busca,
          lo conectamos con vendedores interesados en dejarle su casa para su estancia 
          en las ciudades de Medellín, Bogotá, Cartagena y muchas otras ciudades que sean de su interés.
        </p>
      </div>

      {/* SECCIÓN DERECHA: EL CARRUSEL CON FLECHAS */}
      <div style={styles.bloqueSlider}>
        
        {/* Flecha Izquierda */}
        <button onClick={imagenAnterior} style={styles.botonFlecha}>
          &#10094; {/* Código HTML para la flecha ❮ */}
        </button>

        {/* Contenedor de la Imagen Activa */}
        <div style={styles.contenedorImagen}>
          <img 
            src={imagenes[indiceActual]} 
            alt={`Casa ${indiceActual + 1}`} 
            style={styles.image} 
          />
          {/* Indicador opcional de la ciudad o número */}
          <div style={styles.indicador}>
            {ciudades[indiceActual]}
          </div>
        </div>

        {/* Flecha Derecha */}
        <button onClick={imagenSiguiente} style={styles.botonFlecha}>
          &#10095; {/* Código HTML para la flecha ❯ */}
        </button>

      </div>

    </div>
  );
};

// Estilos en línea para controlar la división limpia del DIV
const styles = {
  seccionContenedor: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000c3a', // Tu azul oscuro original
    padding: '40px',
    gap: '40px',
    width: '100%',
  },
  bloqueTexto: {
    flex: 1, // Toma exactamente el 50% del espacio
    color: 'white',
    fontSize: '1.1rem',
    lineHeight: '1.7',
    textAlign: 'left',
  },
  bloqueSlider: {
    flex: 1, // Toma el otro 50% del espacio
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
  },
  contenedorImagen: {
    position: 'relative',
    width: '350px', // Puedes ajustar el ancho que quieras para tus fotos
    height: '230px',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    objectFit: 'cover',
    boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
  },
  botonFlecha: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s',
  },
  indicador: {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
  }
};

export default ScrollImagenes;