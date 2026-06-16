package com.backend.backend.propiedad;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "propiedades")
public class Propiedad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String ciudad;

    @Column(nullable = false)
    private String ubicacion;

    @Column(nullable = false)
    private int habitaciones;

    @Column(nullable = false)
    private int banos;

    @Column(nullable = false)
    private String telefono;

    @Column(nullable = false)
    private String tipo; // "Renta" o "Venta"

    @Column(nullable = false)
    private String propietario; // Usuario que la publicó

    @Column(length = 500)
    private String imagenUrl; // Por ahora guardamos el nombre del archivo
}