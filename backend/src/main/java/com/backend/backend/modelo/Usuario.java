package com.backend.backend.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data                   // Lombok genera getters, setters, toString automáticamente
@Entity                 // Le dice a JPA que esta clase es una tabla en la BD
@Table(name = "usuarios") // Nombre de la tabla en MySQL
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID auto-incremental
    private Long id;

    @Column(nullable = false, unique = true) // condicion para que el nombre no sea repetido ni vacio
    private String usuario;

    @Column(nullable = false)
    private String contrasena;
}