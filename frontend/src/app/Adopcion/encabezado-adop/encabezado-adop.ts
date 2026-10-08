import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { crearCuentaInterfaz } from '../../models/crearCuentaInterfaz';

@Component({
  selector: 'app-encabezado-adop',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './encabezado-adop.css',
  templateUrl: './encabezado-adop.html',
})
export class EncabezadoAdop implements OnInit {

  private auth = inject(Auth);
  private router = inject(Router);

  usuario: crearCuentaInterfaz | null = null;

  ngOnInit(): void {
    this.usuario = this.auth.obtenerSesion();
  }

  cerrarSesion(): void {
    this.auth.cerrarSesion();

    this.usuario = null;

    this.router.navigate(['/']);
  }
}