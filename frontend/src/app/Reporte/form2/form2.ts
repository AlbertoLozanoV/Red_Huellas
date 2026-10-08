import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Auth } from '../../services/auth';
import { crearCuentaInterfaz } from '../../models/crearCuentaInterfaz';
import { ReporteService } from '../../services/reporte_services';

@Component({
  selector: 'app-form2',
  imports: [FormsModule],
  styleUrl: './form2.css',
  templateUrl: './form2.html',
})
export class Form2 implements AfterViewInit {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private auth = inject(Auth);
  private router = inject(Router);
  private reporteService = inject(ReporteService);

  map!: google.maps.Map;
  marker!: google.maps.Marker;

  usuario: crearCuentaInterfaz | null = null;

  reportante = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: ''
  };

  animal = {
  tipo: '',
  descripcion: '',
  condicion: '',
  fecha: '',
  hora: ''
};

  ubicacion = {
    estado: '',
    municipio: '',
    colonia: '',
    calle: '',
    referencia: '',
    latitud: null as number | null,
    longitud: null as number | null
  };

  ngOnInit(): void {


    this.usuario = this.auth.obtenerSesion();

    if (this.usuario) {
      this.reportante.nombre = this.usuario.nombre;
      this.reportante.apellido = this.usuario.apellido;
      this.reportante.correo = this.usuario.correo;
    }
  }

  ngAfterViewInit(): void {


    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const centroInicial = {
      lat: 19.432608,
      lng: -99.133208
    };

    this.map = new google.maps.Map(
      document.getElementById('map')!,
      {
        center: centroInicial,
        zoom: 15
      }
    );

    this.marker = new google.maps.Marker({
      position: centroInicial,
      map: this.map,
      draggable: true,
      title: 'Selecciona la ubicación'
    });


    this.map.addListener(
      'click',
      (evento: google.maps.MapMouseEvent) => {

        if (!evento.latLng) {
          return;
        }

        this.marker.setPosition(evento.latLng);

        this.obtenerDireccion(
          evento.latLng.lat(),
          evento.latLng.lng()
        );
      }
    );


    this.marker.addListener('dragend', () => {

      const posicion = this.marker.getPosition();

      if (!posicion) {
        return;
      }

      this.obtenerDireccion(
        posicion.lat(),
        posicion.lng()
      );
    });


    this.obtenerDireccion(
      centroInicial.lat,
      centroInicial.lng
    );
  }

  obtenerDireccion(
    latitud: number,
    longitud: number
  ): void {

    this.ubicacion.latitud = latitud;
    this.ubicacion.longitud = longitud;

    const url =
      `https://nominatim.openstreetmap.org/reverse` +
      `?lat=${latitud}` +
      `&lon=${longitud}` +
      `&format=json` +
      `&addressdetails=1`;

    this.http.get<any>(url).subscribe({

      next: (respuesta) => {

        console.log(
          'Respuesta Nominatim:',
          respuesta
        );

        const direccion = respuesta.address;

        if (!direccion) {
          console.error(
            'No se encontró información de dirección.'
          );
          return;
        }


        this.ubicacion.calle =
          direccion.road ||
          direccion.pedestrian ||
          direccion.footway ||
          '';

        this.ubicacion.colonia =
          direccion.neighbourhood ||
          direccion.suburb ||
          direccion.quarter ||
          '';


        this.ubicacion.municipio =
          direccion.city ||
          direccion.town ||
          direccion.municipality ||
          direccion.county ||
          '';

        this.ubicacion.estado =
          direccion.state ||
          '';


        this.cdr.detectChanges();

        console.log(
          'Ubicación seleccionada:',
          this.ubicacion
        );
      },

      error: (error) => {

        console.error(
          'Error al obtener la dirección:',
          error
        );
      }
    });
  }

enviarReporte(): void {
  if (!this.usuario) {
    alert('Debes iniciar sesión para realizar un reporte.');
    this.router.navigate(['/formulario-login']);
    return;
  }

  const reporte = {
    animal: this.animal.tipo,
    descripcion: this.animal.descripcion,
    condicion: this.animal.condicion,
    fecha: this.animal.fecha,
    hora: this.animal.hora,

    estado: this.ubicacion.estado,
    municipio: this.ubicacion.municipio,
    colonia: this.ubicacion.colonia,
    calle: this.ubicacion.calle,
    referencia: this.ubicacion.referencia,
    latitud: this.ubicacion.latitud,
    longitud: this.ubicacion.longitud,

    nombre: this.reportante.nombre,
    apellido: this.reportante.apellido,
    correo: this.reportante.correo,
    telefono: this.reportante.telefono
  };

  console.log('Enviando reporte a la API:', reporte);

  this.reporteService.crearReporte(reporte).subscribe({
    next: (respuesta) => {
      console.log('Respuesta de la API:', respuesta);

      alert(
        '¡Reporte enviado correctamente!\n\n' +
        'Gracias por ayudarnos a cuidar a los animales.'
      );

      this.router.navigate(['/']);
    },
    error: (error) => {
      console.error('Error al enviar el reporte:', error);

      alert(
        'No se pudo enviar el reporte al servidor. ' +
        'Inténtalo nuevamente.'
      );
    }
  });
}

  borrarFormulario(): void {

    this.ubicacion = {
      estado: '',
      municipio: '',
      colonia: '',
      calle: '',
      referencia: '',
      latitud: null,
      longitud: null
    };

    this.reportante.telefono = '';

    this.cdr.detectChanges();
  }
}