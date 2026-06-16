import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ListaFunciones from './BarraFunciones/BarraFunciones.jsx';
import Consultar from './Consultar/Consultar.jsx';
import Publicar from './Publicar/Publicar.jsx';
import Registro from './Registro/Registro.jsx';
import Login from './Login/Login.jsx';
import Perfil from './Perfil/Perfil.jsx';
import ScrollImagenes from './Scrollimagenes/Scroll.jsx';

function App() {
  // Estado global de sesión — null significa "no hay nadie logueado"
  const [usuarioActivo, setUsuarioActivo] = useState(
    JSON.parse(localStorage.getItem('usuarioActivo')) || null
  );

  const handleLoginExitoso = (usuario) => {
    setUsuarioActivo(usuario);
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioActivo');
    setUsuarioActivo(null);
  };

  return (
    <div id='fondo'>
      <BrowserRouter>
        <ListaFunciones />

        {/* Barra de sesión — cambia según si hay usuario o no */}
        <div id="barra-sesion">
          {usuarioActivo ? (
            <div className="sesion-activa">
              <span>👤 Hola, <strong>{usuarioActivo.usuario}</strong></span>
              <button onClick={handleCerrarSesion} className="btn-cerrar-sesion">
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <p className="sesion-inactiva">No has iniciado sesión</p>
          )}
        </div>

        <hr />

        <div id="contenido">
          <Routes>
            <Route path="/" element={
              <div>
                <h1>Bienvenido a HomeFinder</h1>
                <p>Tu plataforma intermediaria para conectar viviendas en renta y venta disponibles.</p>
                <br />
                Somos un intermediario entre usted y las personas que ofrecen sus viviendas para alquiler de
                viviendas o ventas directas, ofreciendole la posibilidad de conseguir la casa de sus sueños, o inclusive de
                poder vender/alquilar la suya propia cuando lo desee.
              </div>
            } />
            <Route path="/consultar" element={<Consultar />} />

            {/* Publicar solo disponible si hay sesión activa */}
            <Route path="/publicar" element={
              usuarioActivo
                ? <Publicar />
                : (
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <h2>Acceso restringido</h2>
                    <p>Debes iniciar sesión para publicar una propiedad.</p>
                  </div>
                )
            } />

            {/* Boton para acceder al perfil*/}
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </div>
      </BrowserRouter>

      <div id='caja-contenido'>
        <div id='Scroll'><ScrollImagenes /></div>
      </div>

      {/* Formularios — solo se muestran si NO hay sesión activa */}
      {!usuarioActivo && (
        <div id='caja-registro'>
          <h1>¿Desea registrarse o iniciar sesion?, aqui tiene disponible el formulario de registro e ingreso</h1>
          <Registro onRegistroExitoso={() => console.log("Registro exitoso")} />
          <Login onLoginExitoso={handleLoginExitoso} />
        </div>
      )}
    </div>
  );
}

export default App;