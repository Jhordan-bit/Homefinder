import { useState, useEffect } from 'react';
import './Perfil.css';
import { API_URL } from '../api';

function Perfil() {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    const [propiedades, setPropiedades] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        obtenerMisPropiedades();
    }, []);

    const obtenerMisPropiedades = async () => {
        setCargando(true);
        try {
            const respuesta = await fetch(
                `${API_URL}/propiedades/mis-propiedades?propietario=${usuarioActivo?.usuario}`
            );
            const datos = await respuesta.json();
            setPropiedades(datos);
        } catch (err) {
            console.error('Error al cargar propiedades:', err);
        }
        setCargando(false);
    };

    const borrarPropiedad = async (id) => {
        const confirmar = window.confirm('¿Seguro que quieres borrar esta propiedad?');
        if (!confirmar) return;

        try {
            const respuesta = await fetch(`${API_URL}/propiedades/${id}`, {
                method: 'DELETE'
            });

            if (!respuesta.ok) throw new Error('Error al borrar');

            // Quitar la propiedad de la lista sin recargar
            setPropiedades(propiedades.filter(p => p.id !== id));
        } catch (err) {
            alert('Ocurrió un error al borrar: ' + err.message);
        }
    };

    return (
        <div className="contenedor-perfil">
            <h1 className="saludo-perfil">Hola, {usuarioActivo?.usuario} 👋</h1>
            <h3 className="subtitulo-perfil">Tus propiedades publicadas</h3>

            {cargando ? (
                <p className="mensaje-perfil">Cargando tus propiedades...</p>
            ) : propiedades.length === 0 ? (
                <p className="mensaje-perfil">No tienes propiedades publicadas aún.</p>
            ) : (
                <div className="lista-mis-propiedades">
                    {propiedades.map((propiedad) => (
                        <div key={propiedad.id} className="tarjeta-perfil">

                            {/* Imagen */}
                            <div className="perfil-imagen">
                                {propiedad.imagenUrl ? (
                                    <img src={propiedad.imagenUrl} alt="Propiedad" />
                                ) : (
                                    <div className="sin-imagen">Sin imagen</div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="perfil-info">
                                <h3>{propiedad.ciudad} — {propiedad.ubicacion}</h3>
                                <p>🛏 {propiedad.habitaciones} hab. &nbsp; 🚿 {propiedad.banos} baños</p>
                                <p>📋 Tipo: <strong>{propiedad.tipo}</strong></p>
                                <p>📞 {propiedad.telefono}</p>
                            </div>

                            {/* Botón borrar */}
                            <button
                                className="btn-borrar"
                                onClick={() => borrarPropiedad(propiedad.id)}
                            >
                                🗑 Borrar
                            </button>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Perfil;