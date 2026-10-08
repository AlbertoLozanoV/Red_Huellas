import { Component } from '@angular/core';
import { EncabezadoCrear } from '../encabezado-crear/encabezado-crear';
import { FormCrearCuenta } from '../form-crear-cuenta/form-crear-cuenta';

@Component({
  imports: [EncabezadoCrear, FormCrearCuenta],
  selector: 'app-crear-cuenta',
  styleUrl: './crear-cuenta.css',
  templateUrl: './crear-cuenta.html',
})
export class CrearCuenta {}
