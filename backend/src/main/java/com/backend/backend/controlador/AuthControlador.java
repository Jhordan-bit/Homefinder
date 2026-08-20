package com.backend.backend.controlador;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.modelo.Usuario;
import com.backend.backend.servicio.UsuarioServicio;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "https://homefinder-git-nueva-funcionalidad-jpallares2020-1334s-projects.vercel.app/") // Permite que React se comunique con Spring
public class AuthControlador {

    @Autowired
    private UsuarioServicio usuarioServicio;

    // POST /auth/registro
    @PostMapping("/registro")
    public ResponseEntity<Map<String, Object>> registro(@RequestBody Map<String, String> datos) {
        Map<String, Object> respuesta = new HashMap<>();
        try {
            Usuario usuario = usuarioServicio.registrar(
                datos.get("usuario"),
                datos.get("contrasena")
            );
            respuesta.put("mensaje", "Usuario registrado con éxito.");
            respuesta.put("id", usuario.getId());
            respuesta.put("usuario", usuario.getUsuario());
            return ResponseEntity.ok(respuesta);

        } catch (RuntimeException e) {
            respuesta.put("mensaje", e.getMessage());
            return ResponseEntity.badRequest().body(respuesta);
        }
    }

    // POST /auth/login
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> datos) {
        Map<String, Object> respuesta = new HashMap<>();
        try {
            Usuario usuario = usuarioServicio.login(
                datos.get("usuario"),
                datos.get("contrasena")
            );
            respuesta.put("mensaje", "Login exitoso.");
            respuesta.put("id", usuario.getId());
            respuesta.put("usuario", usuario.getUsuario());
            return ResponseEntity.ok(respuesta);

        } catch (RuntimeException e) {
            respuesta.put("mensaje", e.getMessage());
            return ResponseEntity.badRequest().body(respuesta);
        }
    }
}
