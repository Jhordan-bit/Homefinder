import { Link } from 'react-router-dom';
import './BarraFunciones.css';

function ListaFunciones({ usuarioActivo, onCerrarSesion }) {
    const enlaces = [
        { id: 1, Func: 'Inicio', Enlace: '/' },
        { id: 2, Func: 'Consultar', Enlace: '/consultar' },
        { id: 3, Func: 'Publicar', Enlace: '/publicar' },
        { id: 4, Func: 'Perfil', Enlace: '/perfil' }
    ];

    return (
        <nav>
            <div id='contenedorfunciones'>

                {/* Links de navegación — lado izquierdo */}
                <div id='listafunciones'>
                    <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: 20 }}>
                        {enlaces.map((link) => (
                            <li key={link.id}>
                                <Link
                                    to={link.Enlace}
                                    style={{ color: '#646cff', textDecoration: 'none', fontWeight: 'bold' }}
                                >
                                    {link.Func}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Opciones de sesión — lado derecho */}
                <div id='opciones-sesion'>
                    {usuarioActivo ? (
                        // Si hay sesión activa
                        <>
                            <Link to="/perfil" className='saludo'>👤 {usuarioActivo.usuario}</Link>
                            <button onClick={onCerrarSesion} className='btn-nav btn-cerrar'>
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        // Si no hay sesión
                        <span className='sin-sesion'>No has iniciado sesión</span>
                    )}
                </div>

            </div>
        </nav>
    );
}

export default ListaFunciones;