
package com.redHuellas.red_huellas_api.controller;

import com.redHuellas.red_huellas_api.entity.Animal;
import com.redHuellas.red_huellas_api.repository.AnimalRepository;

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
@RequestMapping("/api/animales")
@CrossOrigin(origins = "http://localhost:4200")
public class AnimalController {

    private final AnimalRepository animalRepository;

    public AnimalController(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

   
    @GetMapping
    public List<Animal> obtenerAnimales() {
        return animalRepository.findAll();
    }

    
    @GetMapping("/{id}")
    public Animal obtenerAnimalPorId(@PathVariable Integer id) {
        return animalRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Animal no encontrado"
                ));
    }

    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Animal crearAnimal(@RequestBody Animal animal) {
        animal.setIdAnimal(null);
        animal.setFechaRegistro(null);

        return animalRepository.save(animal);
    }

  
    @PutMapping("/{id}")
    public Animal actualizarAnimal(
            @PathVariable Integer id,
            @RequestBody Animal datos) {

        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Animal no encontrado"
                ));

        animal.setIdEspecie(datos.getIdEspecie());
        animal.setIdRaza(datos.getIdRaza());
        animal.setNombre(datos.getNombre());
        animal.setSexo(datos.getSexo());
        animal.setEdadAproximada(datos.getEdadAproximada());
        animal.setCondicion(datos.getCondicion());
        animal.setDescripcion(datos.getDescripcion());

        return animalRepository.save(animal);
    }

 
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminarAnimal(@PathVariable Integer id) {

        if (!animalRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Animal no encontrado"
            );
        }

        animalRepository.deleteById(id);
    }
}
