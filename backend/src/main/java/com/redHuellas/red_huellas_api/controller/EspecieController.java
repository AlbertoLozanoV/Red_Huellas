
package com.redHuellas.red_huellas_api.controller;

import com.redHuellas.red_huellas_api.entity.Especie;
import com.redHuellas.red_huellas_api.repository.EspecieRepository;

import org.springframework.http.HttpStatus;
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
@RequestMapping("/api/especies")
public class EspecieController {

    private final EspecieRepository especieRepository;

    public EspecieController(EspecieRepository especieRepository) {
        this.especieRepository = especieRepository;
    }


    @GetMapping
    public List<Especie> obtenerEspecies() {
        return especieRepository.findAll();
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Especie crearEspecie(@RequestBody Especie especie) {
        especie.setIdEspecie(null);
        return especieRepository.save(especie);
    }


    @PutMapping("/{id}")
    public Especie actualizarEspecie(
            @PathVariable Integer id,
            @RequestBody Especie datos) {

        Especie especie = especieRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Especie no encontrada"));

        especie.setNombre(datos.getNombre());

        return especieRepository.save(especie);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminarEspecie(@PathVariable Integer id) {

        if (!especieRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Especie no encontrada"
                );
        }

        especieRepository.deleteById(id);
    }
}
