package com.redHuellas.red_huellas_api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ReporteController {

    @GetMapping("/api/reportes")
    public String reportes() {
        return "Lista de reportes de Red de Huellas";
    }

    @PostMapping("/api/reportes")
    public Map<String, Object> crearReporte(@RequestBody Map<String, String> reporte) {

        return Map.of(
                "mensaje", "Reporte creado correctamente",
                "animal", reporte.get("animal"),
                "condicion", reporte.get("condicion"),
                "municipio", reporte.get("municipio"),
                "colonia", reporte.get("colonia")
        );
    }
}