
package com.redHuellas.red_huellas_api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "solicitudes_adopcion")
public class SolicitudAdopcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_solicitud")
    private Integer idSolicitud;

    @Column(name = "id_usuario", nullable = false)
    private Integer idUsuario;

    @Column(name = "direccion", nullable = false, length = 255)
    private String direccion;

    @Column(name = "tiene_animales", nullable = false)
    private Boolean tieneAnimales;

    @Column(name = "tipo_animales", length = 255)
    private String tipoAnimales;

    @Column(name = "motivo", nullable = false, columnDefinition = "TEXT")
    private String motivo;

    @Column(name = "puede_cubrir_gastos", nullable = false)
    private Boolean puedeCubrirGastos;

    @Column(name = "estado_solicitud", nullable = false, length = 30)
    private String estadoSolicitud = "PENDIENTE";

    @Column(name = "fecha_solicitud", insertable = false, updatable = false)
    private LocalDateTime fechaSolicitud;

    @Column(name = "fecha_actualizacion", insertable = false, updatable = false)
    private LocalDateTime fechaActualizacion;

    public SolicitudAdopcion() {
    }

    public Integer getIdSolicitud() {
        return idSolicitud;
    }

    public void setIdSolicitud(Integer idSolicitud) {
        this.idSolicitud = idSolicitud;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Boolean getTieneAnimales() {
        return tieneAnimales;
    }

    public void setTieneAnimales(Boolean tieneAnimales) {
        this.tieneAnimales = tieneAnimales;
    }

    public String getTipoAnimales() {
        return tipoAnimales;
    }

    public void setTipoAnimales(String tipoAnimales) {
        this.tipoAnimales = tipoAnimales;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public Boolean getPuedeCubrirGastos() {
        return puedeCubrirGastos;
    }

    public void setPuedeCubrirGastos(Boolean puedeCubrirGastos) {
        this.puedeCubrirGastos = puedeCubrirGastos;
    }

    public String getEstadoSolicitud() {
        return estadoSolicitud;
    }

    public void setEstadoSolicitud(String estadoSolicitud) {
        this.estadoSolicitud = estadoSolicitud;
    }

    public LocalDateTime getFechaSolicitud() {
        return fechaSolicitud;
    }

    public LocalDateTime getFechaActualizacion() {
        return fechaActualizacion;
    }
}
