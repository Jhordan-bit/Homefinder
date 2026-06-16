package com.backend.backend.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.modelo.Usuario;
import com.backend.backend.repositorio.UsuarioRepositorio;

@Service
public class UsuarioServicio {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    // Lógica de registro
    public Usuario registrar(String usuario, String contrasena) {

        // Verifica que el usuario no exista ya en la BD
        if (usuarioRepositorio.findByUsuario(usuario).isPresent()) {
            throw new RuntimeException("El usuario ya existe.");
        }

        // Crea el nuevo usuario y lo guarda
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setUsuario(usuario);
        nuevoUsuario.setContrasena(contrasena); // Más adelante se puede encriptar con BCrypt
        
        return usuarioRepositorio.save(nuevoUsuario);
    }

    // Lógica de login
    public Usuario login(String usuario, String contrasena) {

        // Busca el usuario en la BD
        Usuario usuarioEncontrado = usuarioRepositorio.findByUsuario(usuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado."));

        // Verifica la contraseña
        if (!usuarioEncontrado.getContrasena().equals(contrasena)) {
            throw new RuntimeException("Contraseña incorrecta.");
        }

        return usuarioEncontrado;
    }
}
