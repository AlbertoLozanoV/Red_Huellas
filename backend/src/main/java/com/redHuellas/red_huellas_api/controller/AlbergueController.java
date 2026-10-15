
package com.redHuellas.red_huellas_api.controller;

import com.redHuellas.red_huellas_api.entity.Albergue;
import com.redHuellas.red_huellas_api.repository.AlbergueRepository;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/albergues")
@CrossOrigin(origins = "http://localhost:4200")
public class AlbergueController {

    private final AlbergueRepository albergueRepository;

    public AlbergueController(AlbergueRepository albergueRepository) {
        this.albergueRepository = albergueRepository;
    }


    @GetMapping
    public List<Albergue> obtenerAlbergues() {
        return albergueRepository.findAll();
    }

 
    @GetMapping("/{id}")
    public Albergue obtenerAlberguePorId(@PathVariable Integer id) {
        return albergueRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Albergue no encontrado"
                ));
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Albergue crearAlbergue(@RequestBody Albergue albergue) {
        albergue.setIdAlbergue(null);

        if (albergue.getActivo() == null) {
            albergue.setActivo(true);
        }

        return albergueRepository.save(albergue);
    }


    @PutMapping("/{id}")
    public Albergue actualizarAlbergue(
            @PathVariable Integer id,
            @RequestBody Albergue datos) {

        Albergue albergue = albergueRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Albergue no encontrado"
                ));

        albergue.setNombre(datos.getNombre());
        albergue.setIdUbicacion(datos.getIdUbicacion());
        albergue.setDescripcion(datos.getDescripcion());

        if (datos.getActivo() != null) {
            albergue.setActivo(datos.getActivo());
        }

        return albergueRepository.save(albergue);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminarAlbergue(@PathVariable Integer id) {

        if (!albergueRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Albergue no encontrado"
            );
        }

        albergueRepository.deleteById(id);
    }
}
