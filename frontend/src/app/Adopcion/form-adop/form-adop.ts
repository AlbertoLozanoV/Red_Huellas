import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { adopcionInterfaz } from '../../models/adopcionInterfaz';
import { Auth } from '../../services/auth';

@Component({
  imports: [],
  selector: 'app-form-adop',
  styleUrl: './form-adop.css',
  templateUrl: './form-adop.html',
})
export class FormAdop {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(Auth);

  animal: string = '';
  imagenAnimal: string = '';

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      this.animal = params.get('animal') || '';

      switch (this.animal.toLowerCase()) {

        case 'coffe':
          this.imagenAnimal =
            'https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg';
          break;

        case 'dug':
          this.imagenAnimal =
            'https://cdn0.uncomo.com/es/posts/3/4/4/basset_hound_55443_0_600.jpg';
          break;

        case 'luna':
          this.imagenAnimal =
            'https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg';
          break;

        default:
          this.imagenAnimal = '';
          break;
      }

    });

  }

  onSubmit(
    event: Event,
    txtNombre: string,
    txtEdad: string,
    txtCorreo: string,
    txtTelefono: string,
    txtDireccion: string,
    txtAnimales: string,
    txtTipoAnimales: string,
    txtMotivo: string,
    txtGastos: string
  ): void {

    event.preventDefault();
    event.stopPropagation();

    if (!this.auth.estaLogueado()) {

      alert(
        'Debes iniciar sesión para poder postularte para adoptar a un animal.'
      );

      this.router.navigate(['/formulario-login']);

      return;
    }

    if (
      !txtNombre.trim() ||
      !txtEdad.trim() ||
      !txtCorreo.trim() ||
      !txtTelefono.trim() ||
      !txtDireccion.trim() ||
      !txtMotivo.trim()
    ) {

      alert(
        'Por favor, llena todos los campos antes de enviar tu solicitud de adopción.'
      );

      return;
    }

    const edad = Number(txtEdad);

    if (isNaN(edad) || edad <= 0) {

      alert('Por favor, ingresa una edad válida.');

      return;
    }

    const datosAdopcion: adopcionInterfaz = {

      nombre: txtNombre,
      edad: edad,
      correo: txtCorreo,
      telefono: BigInt(txtTelefono),
      direccion: txtDireccion,
      animales: txtAnimales === 'si',
      tipoAnimales: txtTipoAnimales,
      motivo: txtMotivo,
      gastos: txtGastos === 'si'

    };

    console.log('Adopción:', {
      animal: this.animal,
      datosAdopcion
    });

    this.auth.registrarAdopcion(this.animal);

    alert(
      `¡Te has postulado para adoptar a ${this.animal.toUpperCase()}! 🐶\n\n` +
      'Hemos recibido correctamente tu solicitud de adopción.'
    );

    this.router.navigate(['/']);

  }

}