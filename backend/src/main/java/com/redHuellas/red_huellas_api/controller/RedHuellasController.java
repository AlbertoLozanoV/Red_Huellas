package com.redHuellas.red_huellas_api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RedHuellasController {

    @GetMapping("/api/hola")
    public String hola() {
        return "Hola desde la API de Red de Huellas";
    }
}