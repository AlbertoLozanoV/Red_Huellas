import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario_service';
import { ReporteService } from '../services/reporte_services';

@Component({
  selector: 'app-ejemplo',
  standalone: true,
  imports: [],
  templateUrl: './ejemplo.html',
  styleUrl: './ejemplo.css'
})
export class Ejemplo {

  mensaje = '';

  constructor(
  private usuarioService: UsuarioService,
  private reporteService: ReporteService
) {}

  probarApi(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (respuesta) => {
        this.mensaje = respuesta;
      },
      error: (error) => {
        console.error(error);
        this.mensaje = 'Error al conectar con Spring Boot';
      }
    });
  }

  registrarUsuario(): void {
  const usuario = {
    nombre: 'Alberto',
    apellido: 'Lozano',
    correo: 'alberto@ejemplo.com',
    password: '123456'
  };

  this.usuarioService.registrarUsuario(usuario).subscribe({
    next: (respuesta) => {
      this.mensaje = JSON.stringify(respuesta);
    },
    error: (error) => {
      console.error(error);
      this.mensaje = 'Error al registrar usuario';
    }
  });
}

probarReporte(): void {
  const reporte = {
    estado: 'Estado de México',
    municipio: 'Tecámac',
    colonia: 'Centro',
    calle: 'Calle Ejemplo',
    referencia: 'Cerca del parque',
    animal: 'Perro',
    condicion: 'Buena'
  };

  this.reporteService.crearReporte(reporte).subscribe({
    next: (respuesta) => {
      this.mensaje = JSON.stringify(respuesta);
    },
    error: (error) => {
      console.error(error);
      this.mensaje = 'Error al crear reporte';
    }
  });
}
}