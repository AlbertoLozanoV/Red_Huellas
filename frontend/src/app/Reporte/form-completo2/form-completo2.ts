import { Component } from '@angular/core';
import { EncabezadoF2 } from '../encabezado-f2/encabezado-f2';
import { Form2 } from '../form2/form2';

@Component({
  imports: [EncabezadoF2, Form2],
  selector: 'app-form-completo2',
  styleUrl: './form-completo2.css',
  templateUrl: './form-completo2.html',
})
export class FormCompleto2 {}
