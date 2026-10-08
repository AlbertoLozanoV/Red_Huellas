import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  imports: [RouterLink],
  selector: 'app-seccion1',
  styleUrl: './seccion1.css',
  templateUrl: './seccion1.html',
})
export class Seccion1 {

  private auth = inject(Auth);

  mostrarCoffe: boolean = true;
  mostrarDug: boolean = true;
  mostrarLuna: boolean = true;

  constructor() {

    effect(() => {

      this.auth.sesionActiva();

      this.auth.adopcionesActualizadas();

      this.actualizarMascotas();

    });

  }

  private actualizarMascotas(): void {

    if (!this.auth.sesionActiva()) {

      this.mostrarCoffe = true;
      this.mostrarDug = true;
      this.mostrarLuna = true;

      return;
    }

    this.mostrarCoffe =
      !this.auth.yaSePostulo('Coffe');

    this.mostrarDug =
      !this.auth.yaSePostulo('Dug');

    this.mostrarLuna =
      !this.auth.yaSePostulo('Luna');
  }
}