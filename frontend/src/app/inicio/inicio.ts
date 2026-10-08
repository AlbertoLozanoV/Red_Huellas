import { Component } from '@angular/core';
import { Encabezado } from '../encabezado/encabezado';
import { Seccion1 } from '../seccion1/seccion1';
import { Seccion2 } from '../seccion2/seccion2';
import { Ejemplo} from '../ejemplo/ejemplo';
import { Persona } from '../persona';
import { persona } from '../models/persona';

@Component({
  imports: [Encabezado, Seccion1, Seccion2, Ejemplo],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {

    onSubmit(
    txtNombre: string,
    txtEdad: number
     ):void{
    const credenciales: persona = {
      nombre: txtNombre,
      edad: txtEdad
    }
     }
}
