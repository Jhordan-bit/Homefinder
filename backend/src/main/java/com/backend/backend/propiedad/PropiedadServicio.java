package com.backend.backend.propiedad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PropiedadServicio {

    @Autowired
    private PropiedadRepositorio propiedadRepositorio;

    // Guardar una nueva propiedad
    public Propiedad guardar(Propiedad propiedad) {
        return propiedadRepositorio.save(propiedad);
    }

    // Traer todas las propiedades
    public List<Propiedad> obtenerTodas() {
        return propiedadRepositorio.findAll();
    }

    // Traer solo las propiedades de un usuario
    public List<Propiedad> obtenerPorPropietario(String propietario) {
        return propiedadRepositorio.findByPropietario(propietario);
    }

    // Borrar una propiedad por id
    public void borrar(Long id) {
        propiedadRepositorio.deleteById(id);
    }

    // Filtrar por ciudad, ubicacion y tipo
    public List<Propiedad> filtrar(String ciudad, String ubicacion, String tipo) {
        boolean tieneCiudad    = ciudad != null && !ciudad.isEmpty();
        boolean tieneUbicacion = ubicacion != null && !ubicacion.isEmpty();
        boolean tieneTipo      = tipo != null && !tipo.isEmpty();

        if (tieneCiudad && tieneUbicacion && tieneTipo) {
            return propiedadRepositorio.findByCiudadAndUbicacionAndTipo(ciudad, ubicacion, tipo);
        } else if (tieneCiudad && tieneTipo) {
            return propiedadRepositorio.findByCiudadAndTipo(ciudad, tipo);
        } else if (tieneCiudad) {
            return propiedadRepositorio.findByCiudad(ciudad);
        } else if (tieneTipo) {
            return propiedadRepositorio.findByTipo(tipo);
        } else {
            return propiedadRepositorio.findAll();
        }
    }
}