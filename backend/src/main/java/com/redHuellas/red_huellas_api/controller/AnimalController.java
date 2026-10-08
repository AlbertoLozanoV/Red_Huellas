package com.redHuellas.red_huellas_api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnimalController {

    @GetMapping("/api/animales")
    public String animales() {
        return "Endpoint de animales funcionando correctamente";
    }
}