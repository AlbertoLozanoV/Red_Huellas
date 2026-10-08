import { Component } from '@angular/core';
import { EncabezadoF1 } from '../encabezado-f1/encabezado-f1';
import { Form1 } from '../form1/form1';

@Component({
  imports: [EncabezadoF1, Form1],
  selector: 'app-form-completo1',
  styleUrl: './form-completo1.css',
  templateUrl: './form-completo1.html',
})
export class FormCompleto1 {}
