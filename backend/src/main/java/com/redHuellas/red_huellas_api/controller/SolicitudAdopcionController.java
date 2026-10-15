
package com.redHuellas.red_huellas_api.controller;

import com.redHuellas.red_huellas_api.entity.SolicitudAdopcion;
import com.redHuellas.red_huellas_api.repository.SolicitudAdopcionRepository;

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
@RequestMapping("/api/solicitudes-adopcion")
@CrossOrigin(origins = "http://localhost:4200")
public class SolicitudAdopcionController {

    private final SolicitudAdopcionRepository solicitudRepository;

    public SolicitudAdopcionController(
            SolicitudAdopcionRepository solicitudRepository) {
        this.solicitudRepository = solicitudRepository;
    }

    @GetMapping
    public List<SolicitudAdopcion> obtenerSolicitudes() {
        return solicitudRepository.findAll();
    }


    @GetMapping("/{id}")
    public SolicitudAdopcion obtenerSolicitudPorId(
            @PathVariable Integer id) {

        return solicitudRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Solicitud de adopción no encontrada"
                ));
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SolicitudAdopcion crearSolicitud(
            @RequestBody SolicitudAdopcion solicitud) {

        validarCamposObligatorios(solicitud);

        solicitud.setIdSolicitud(null);

        if (solicitud.getEstadoSolicitud() == null
                || solicitud.getEstadoSolicitud().isBlank()) {
            solicitud.setEstadoSolicitud("PENDIENTE");
        }

        return solicitudRepository.save(solicitud);
    }

    @PutMapping("/{id}")
    public SolicitudAdopcion actualizarSolicitud(
            @PathVariable Integer id,
            @RequestBody SolicitudAdopcion datos) {

        SolicitudAdopcion solicitud = solicitudRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Solicitud de adopción no encontrada"
                ));

        validarCamposObligatorios(datos);

        solicitud.setIdUsuario(datos.getIdUsuario());
        solicitud.setDireccion(datos.getDireccion());
        solicitud.setTieneAnimales(datos.getTieneAnimales());
        solicitud.setTipoAnimales(datos.getTipoAnimales());
        solicitud.setMotivo(datos.getMotivo());
        solicitud.setPuedeCubrirGastos(datos.getPuedeCubrirGastos());

        if (datos.getEstadoSolicitud() != null
                && !datos.getEstadoSolicitud().isBlank()) {
            solicitud.setEstadoSolicitud(datos.getEstadoSolicitud());
        }

        return solicitudRepository.save(solicitud);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminarSolicitud(@PathVariable Integer id) {

        if (!solicitudRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Solicitud de adopción no encontrada"
            );
        }

        solicitudRepository.deleteById(id);
    }


    private void validarCamposObligatorios(
            SolicitudAdopcion solicitud) {

        if (solicitud.getIdUsuario() == null
                || solicitud.getDireccion() == null
                || solicitud.getDireccion().isBlank()
                || solicitud.getTieneAnimales() == null
                || solicitud.getMotivo() == null
                || solicitud.getMotivo().isBlank()
                || solicitud.getPuedeCubrirGastos() == null) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Completa todos los campos obligatorios de la solicitud"
            );
        }
    }
}
