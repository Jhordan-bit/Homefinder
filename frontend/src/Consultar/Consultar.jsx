import { useState, useEffect } from 'react';
import './Consultar.css';

function Consultar() {
    const [propiedades, setPropiedades] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [filtros, setFiltros] = useState({
        ciudad: '',
        ubicacion: '',
        tipo: ''
    });

    // Cargar todas las propiedades al entrar a la página
    useEffect(() => {
        obtenerPropiedades();
    }, []);

    const obtenerPropiedades = async () => {
        setCargando(true);
        try {
            const respuesta = await fetch('http://localhost:8080/propiedades/todas');
            const datos = await respuesta.json();
            setPropiedades(datos);
        } catch (err) {
            console.error('Error al cargar propiedades:', err);
        }
        setCargando(false);
    };

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros({ ...filtros, [name]: value });
    };

    const aplicarFiltros = async () => {
        setCargando(true);
        try {
            const params = new URLSearchParams();
            if (filtros.ciudad)    params.append('ciudad', filtros.ciudad);
            if (filtros.ubicacion) params.append('ubicacion', filtros.ubicacion);
            if (filtros.tipo)      params.append('tipo', filtros.tipo);

            const respuesta = await fetch(`http://localhost:8080/propiedades/filtrar?${params}`);
            const datos = await respuesta.json();
            setPropiedades(datos);
        } catch (err) {
            console.error('Error al filtrar:', err);
        }
        setCargando(false);
    };

    const limpiarFiltros = () => {
        setFiltros({ ciudad: '', ubicacion: '', tipo: '' });
        obtenerPropiedades();
    };

    return (
        <div className="contenedor-consultar">
            <h2>Propiedades Disponibles</h2>

            {/* Barra de filtros */}
            <div className="barra-filtros">
                <select name="ciudad" value={filtros.ciudad} onChange={handleFiltroChange}>
                    <option value="">Todas las ciudades</option>
                    <option value="Medellin">Medellín</option>
                    <option value="Bogota">Bogotá</option>
                    <option value="Cartagena">Cartagena</option>
                    <option value="Santa Marta">Santa Marta</option>
                    <option value="Cali">Cali</option>
                    <option value="Barranquilla">Barranquilla</option>
                    <option value="Bucaramanga">Bucaramanga</option>
                </select>

                <input
                    type="text"
                    name="ubicacion"
                    placeholder="Zona o ubicación..."
                    value={filtros.ubicacion}
                    onChange={handleFiltroChange}
                />

                <select name="tipo" value={filtros.tipo} onChange={handleFiltroChange}>
                    <option value="">Renta o Venta</option>
                    <option value="Renta">Renta</option>
                    <option value="Venta">Venta</option>
                </select>

                <button onClick={aplicarFiltros} className="btn-filtrar">Filtrar</button>
                <button onClick={limpiarFiltros} className="btn-limpiar">Limpiar</button>
            </div>

            {/* Tarjetas de propiedades */}
            {cargando ? (
                <p className="mensaje-carga">Cargando propiedades...</p>
            ) : propiedades.length === 0 ? (
                <p className="mensaje-vacio">No se encontraron propiedades.</p>
            ) : (
                <div className="grid-propiedades">
                    {propiedades.map((propiedad) => (
                        <div key={propiedad.id} className="tarjeta-propiedad">

                            {/* Imagen */}
                            <div className="tarjeta-imagen">
                                {propiedad.imagenUrl ? (
                                    <img src={propiedad.imagenUrl} alt="Propiedad" />
                                ) : (
                                    <div className="sin-imagen">Sin imagen</div>
                                )}
                                <span className={`badge-tipo ${propiedad.tipo === 'Renta' ? 'badge-renta' : 'badge-venta'}`}>
                                    {propiedad.tipo}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="tarjeta-info">
                                <h3>{propiedad.ciudad} — {propiedad.ubicacion}</h3>
                                <div className="tarjeta-detalles">
                                    <span>🛏 {propiedad.habitaciones} hab.</span>
                                    <span>🚿 {propiedad.banos} baños</span>
                                </div>
                                <p className="tarjeta-propietario">📋 Publicado por: <strong>{propiedad.propietario}</strong></p>
                                <a href={`tel:${propiedad.telefono}`} className="btn-contactar">
                                    📞 {propiedad.telefono}
                                </a>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Consultar;