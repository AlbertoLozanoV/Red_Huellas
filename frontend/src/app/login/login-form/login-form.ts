import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { loginInterfaz } from '../../models/loginInterfaz';
import { Auth } from '../../services/auth';

@Component({
  imports: [RouterLink],
  selector: 'app-login-form',
  styleUrl: './login-form.css',
  templateUrl: './login-form.html',
})
export class LoginForm {

  private router = inject(Router);
  private auth = inject(Auth);

  cargando: boolean = false;

  onSubmit(
    event: Event,
    txtEmail: string,
    txtPass: string
  ): void {

    event.preventDefault();
    event.stopPropagation();


    if (!txtEmail.trim() || !txtPass.trim()) {
      alert('Por favor, llena todos los campos antes de iniciar sesión.');
      return;
    }


    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(txtEmail)) {
      alert(
        'Por favor, ingresa un correo electrónico válido (ejemplo@correo.com).'
      );
      return;
    }

    const credenciales: loginInterfaz = {
      email: txtEmail.trim(),
      pass: txtPass
    };


    this.cargando = true;


    const loginCorrecto = this.auth.iniciarSesion(
      credenciales.email,
      credenciales.pass
    );

    if (!loginCorrecto) {
      this.cargando = false;

      alert('Correo o contraseña incorrectos.');
      return;
    }

    console.log('Inicio de sesión correcto:', credenciales.email);


    setTimeout(() => {
      this.cargando = false;

      this.router.navigate(['']);
    }, 1000);
  }
}