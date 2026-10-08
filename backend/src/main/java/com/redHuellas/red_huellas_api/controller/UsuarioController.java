package com.redHuellas.red_huellas_api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UsuarioController {

    @GetMapping("/api/usuarios")
    public String usuarios() {
        return "Lista de usuarios de Red de Huellas";
    }

    @PostMapping("/api/usuarios")
    public Map<String, Object> registrarUsuario(@RequestBody Map<String, String> usuario) {

        return Map.of(
                "mensaje", "Usuario registrado correctamente",
                "nombre", usuario.get("nombre"),
                "apellido", usuario.get("apellido"),
                "correo", usuario.get("correo")
        );
    }
}