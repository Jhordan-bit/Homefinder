package com.backend.backend.modelo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;

class BackendApplicationTests {

    @Test
    void testCrearUsuarioYGettersSetters() {
        // 1. Arrange
        Usuario usuario = new Usuario();
        Long idEsperado = 1L;
        String nombreUsuarioEsperado = "zuri_dev";
        String passwordEsperada = "mi_password_seguro";

        // 2. Act
        usuario.setId(idEsperado);
        usuario.setUsuario(nombreUsuarioEsperado);
        
        // NOTA: Si en tu clase Usuario dejaste "contrasena", cambia aquí a setContrasena
        usuario.setContrasena(passwordEsperada); 

        // 3. Assert
        assertNotNull(usuario, "El objeto usuario no debería ser nulo");
        assertEquals(idEsperado, usuario.getId(), "El ID debería coincidir");
        assertEquals(nombreUsuarioEsperado, usuario.getUsuario(), "El nombre de usuario debería coincidir");
        
        // NOTA: Si dejaste "contrasena", cambia aquí a getContrasena
        assertEquals(passwordEsperada, usuario.getContrasena(), "La contraseña debería coincidir");
    }
}