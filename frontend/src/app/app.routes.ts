import { Routes } from '@angular/router';

import { Inicio } from './inicio/inicio';
import { FormCompleto1 } from './Formularios/form-completo1/form-completo1';
import { FormCompleto2 } from './Reporte/form-completo2/form-completo2';
import { Login } from './login/login/login';
import { Adopcion } from './Adopcion/adopcion/adopcion';
import { CrearCuenta } from './crear-cuenta/cuenta/crear-cuenta';
import { guestGuard } from './guards/guest-guard';
import { Casos } from './casos/casos';
import { Ejemplo } from './ejemplo/ejemplo';

export const routes: Routes = [

  {
    path: '',
    component: Inicio,
    pathMatch: 'full'
  },

  {
    path: 'formulario-albergue',
    component: FormCompleto1
  },

  {
    path: 'formulario-reporte',
    component: FormCompleto2
  },

  {
    path: 'formulario-login',
    component: Login,
    canActivate: [guestGuard]
  },

  {
  path: 'formulario-adopcion/:animal',
  component: Adopcion
  },

  {
    path: 'formulario-CrearCuenta',
    component: CrearCuenta,
    canActivate: [guestGuard]
  },

  {
  path: 'caso/:id',
  component: Casos
},
{
  path: 'ejemplo',
  component: Ejemplo
}
];