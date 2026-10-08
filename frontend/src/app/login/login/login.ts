import { Component } from '@angular/core';
import { EncabezadoLogin } from '../encabezado-login/encabezado-login';
import { LoginForm } from '../login-form/login-form';
import { loginInterfaz} from '../../models/loginInterfaz';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [EncabezadoLogin, LoginForm, ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  
  

}
