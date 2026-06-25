package com.backend.backend.propiedad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/propiedades")
@CrossOrigin(origins = "https://homefinder-pi.vercel.app/")
public class PropiedadControlador {

    @Autowired
    private PropiedadServicio propiedadServicio;

    private static final String CARPETA_UPLOADS = "uploads/";

    // POST /propiedades/guardar
    @PostMapping("/guardar")
    public ResponseEntity<Propiedad> guardar(
            @RequestParam("ciudad")       String ciudad,
            @RequestParam("ubicacion")    String ubicacion,
            @RequestParam("habitaciones") int habitaciones,
            @RequestParam("banos")        int banos,
            @RequestParam("telefono")     String telefono,
            @RequestParam("tipo")         String tipo,
            @RequestParam("propietario")  String propietario,
            @RequestParam("imagen")       MultipartFile imagen) {

        try {
            File carpeta = new File(CARPETA_UPLOADS);
            if (!carpeta.exists()) carpeta.mkdirs();

            String nombreArchivo = UUID.randomUUID() + "_" + imagen.getOriginalFilename();
            Path ruta = Paths.get(CARPETA_UPLOADS + nombreArchivo);
            Files.write(ruta, imagen.getBytes());

            Propiedad propiedad = new Propiedad();
            propiedad.setCiudad(ciudad);
            propiedad.setUbicacion(ubicacion);
            propiedad.setHabitaciones(habitaciones);
            propiedad.setBanos(banos);
            propiedad.setTelefono(telefono);
            propiedad.setTipo(tipo);
            propiedad.setPropietario(propietario);
            propiedad.setImagenUrl("https://homefinder-backend-4ckh.onrender.com/uploads/" + nombreArchivo);

            return ResponseEntity.ok(propiedadServicio.guardar(propiedad));

        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // GET /propiedades/todas
    @GetMapping("/todas")
    public ResponseEntity<List<Propiedad>> obtenerTodas() {
        return ResponseEntity.ok(propiedadServicio.obtenerTodas());
    }

    // GET /propiedades/filtrar
    @GetMapping("/filtrar")
    public ResponseEntity<List<Propiedad>> filtrar(
            @RequestParam(required = false) String ciudad,
            @RequestParam(required = false) String ubicacion,
            @RequestParam(required = false) String tipo) {
        return ResponseEntity.ok(propiedadServicio.filtrar(ciudad, ubicacion, tipo));
    }

    // GET /propiedades/mis-propiedades?propietario=X
    @GetMapping("/mis-propiedades")
    public ResponseEntity<List<Propiedad>> misPropiedades(@RequestParam String propietario) {
        return ResponseEntity.ok(propiedadServicio.obtenerPorPropietario(propietario));
    }

    // DELETE /propiedades/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> borrar(@PathVariable Long id) {
        propiedadServicio.borrar(id);
        return ResponseEntity.ok().build();
    }
}