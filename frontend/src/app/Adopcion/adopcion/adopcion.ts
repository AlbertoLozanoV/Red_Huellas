import { Component } from '@angular/core';
import { EncabezadoAdop } from '../encabezado-adop/encabezado-adop';
import { FormAdop } from '../form-adop/form-adop';

@Component({
  imports: [EncabezadoAdop, FormAdop],
  selector: 'app-adopcion',
  styleUrl: './adopcion.css',
  templateUrl: './adopcion.html',
})
export class Adopcion {}
