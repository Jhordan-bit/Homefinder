package com.backend.backend.repositorio;

import com.backend.backend.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    // Spring genera automáticamente la consulta SQL para buscar por nombre de usuario
    Optional<Usuario> findByUsuario(String usuario);
}