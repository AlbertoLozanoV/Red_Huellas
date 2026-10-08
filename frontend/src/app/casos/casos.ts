import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncabezadoCrear } from '../crear-cuenta/encabezado-crear/encabezado-crear';

interface Caso {
  id: string;
  imagen: string;
  alt: string;
  estado: string;
  claseEstado: string;
  nombre: string;
  ubicacion: string;
  descripcion: string;
  fecha: string;
  hora: string;
}

@Component({
  selector: 'app-casos',
  standalone: true,
  imports: [EncabezadoCrear],
  templateUrl: './casos.html',
  styleUrl: './casos.css'
})
export class Casos {

  private route = inject(ActivatedRoute);

  idCaso: string = '';
  caso: Caso | null = null;

  casos: Caso[] = [
    {
      id: '1',
      imagen: 'https://content.elmueble.com/medio/2023/04/11/bull-terrier_c73372f7_230411112534_900x900.jpg',
      alt: 'Bull Terrier',
      estado: 'En búsqueda',
      claseEstado: 'amarillo',
      nombre: 'Bull Terrier',
      ubicacion: 'Ojo de Agua, Estado de México',
      descripcion: 'Se busca localizar a este animal. Se solicita a cualquier persona que tenga información sobre su paradero que realice un reporte.',
      fecha: '21 de septiembre de 2026',
      hora: '15:30'
    },
    {
      id: '2',
      imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Gatosiames.jpg/330px-Gatosiames.jpg?utm_source=es.wikipedia.org&utm_campaign=parser&utm_content=thumbnail',
      alt: 'Gato siamés',
      estado: 'Perdido',
      claseEstado: 'rojo',
      nombre: 'Gato siamés',
      ubicacion: 'Tecámac, Estado de México',
      descripcion: 'El animal fue reportado como perdido. Se solicita apoyo para localizarlo y reunirlo nuevamente con su familia.',
      fecha: '20 de septiembre de 2026',
      hora: '18:20'
    },
    {
      id: '3',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyvRCiZWQkxkXXTnGV1o6iQJcS4gkfJdXLqrzZTXi5T6yc-XluyPukNKdi&s=10',
      alt: 'Husky',
      estado: 'Encontrado',
      claseEstado: 'verde',
      nombre: 'Husky',
      ubicacion: 'Ecatepec, Estado de México',
      descripcion: 'Este animal fue encontrado y actualmente se busca localizar a su propietario o encontrar un lugar seguro donde pueda permanecer.',
      fecha: '19 de septiembre de 2026',
      hora: '12:45'
    }
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      this.idCaso = params.get('id') || '';

      this.caso = this.casos.find(
        caso => caso.id === this.idCaso
      ) || null;

    });
  }
}