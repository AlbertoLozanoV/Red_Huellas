import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './encabezado.css',
  templateUrl: './encabezado.html',
})
export class Encabezado {

  private auth = inject(Auth);

  usuario = this.auth.obtenerSesion();

  cerrarSesion(): void {

    this.auth.cerrarSesion();

    window.location.href = '/';

  }
}