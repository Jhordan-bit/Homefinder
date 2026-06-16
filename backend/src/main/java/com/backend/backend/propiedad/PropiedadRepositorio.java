package com.backend.backend.propiedad;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropiedadRepositorio extends JpaRepository<Propiedad, Long> {

    List<Propiedad> findByPropietario(String propietario);
    List<Propiedad> findByCiudad(String ciudad);
    List<Propiedad> findByTipo(String tipo);
    List<Propiedad> findByCiudadAndTipo(String ciudad, String tipo);
    List<Propiedad> findByCiudadAndUbicacionAndTipo(String ciudad, String ubicacion, String tipo);
}