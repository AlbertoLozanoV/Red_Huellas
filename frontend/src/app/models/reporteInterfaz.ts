
export interface reporteInterfaz {

  animal: string;
  descripcion: string;
  condicion: string;

  fecha: string;
  hora: string;
  foto: string;

  ubicacion: {
    estado: string;
    municipio: string;
    colonia: string;
    calle: string;
    referencia: string;
  };

  reportante: {
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
  };
}
