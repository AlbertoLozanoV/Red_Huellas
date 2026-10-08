import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { crearCuentaInterfaz } from '../../models/crearCuentaInterfaz';
import { Auth } from '../../services/auth';
import { UsuarioService } from '../../services/usuario_service';

@Component({
  selector: 'app-form-crear-cuenta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './form-crear-cuenta.html',
  styleUrl: './form-crear-cuenta.css'
})
export class FormCrearCuenta {

  cargando: boolean = false;

  usuario: crearCuentaInterfaz = {
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '',
    contraseñaConfirm: ''
  };

constructor(
  private router: Router,
  private auth: Auth,
  private usuarioService: UsuarioService
) {}

  onSubmit(
    event: Event,
    nombre: string,
    apellido: string,
    correo: string,
    contraseña: string,
    contraseñaConfirm: string
  ) {

    event.preventDefault();


    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !correo.trim() ||
      !contraseña.trim() ||
      !contraseñaConfirm.trim()
    ) {
      alert('Por favor, llena todos los campos.');
      return;
    }

    this.usuario = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      correo: correo.trim(),
      contraseña: contraseña,
      contraseñaConfirm: contraseñaConfirm
    };

    if (this.usuario.contraseña !== this.usuario.contraseñaConfirm) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.cargando = true;


const registrado = this.auth.registrarUsuario(this.usuario);

if (!registrado) {
  this.cargando = false;
  alert('Ya existe una cuenta registrada con ese correo.');
  return;
}

const usuarioApi = {
  nombre: this.usuario.nombre,
  apellido: this.usuario.apellido,
  correo: this.usuario.correo,
  password: this.usuario.contraseña
};

this.usuarioService.registrarUsuario(usuarioApi).subscribe({
  next: (respuesta) => {
    console.log('Usuario registrado en la API:', respuesta);

    setTimeout(() => {
      this.cargando = false;
      this.router.navigate(['/formulario-login']);
    }, 1000);
  },
  error: (error) => {
    console.error('Error al registrar en la API:', error);
    this.cargando = false;
    alert('El usuario se guardó localmente, pero hubo un error al conectar con la API.');
  }
});

  }
}