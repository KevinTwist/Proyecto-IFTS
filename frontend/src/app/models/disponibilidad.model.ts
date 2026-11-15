export interface Disponibilidad {
  id_disponibilidad: number;
  fecha: string;
  hora: string;
}

export interface DisponibilidadAdmin extends Disponibilidad {
  ocupada: boolean;
}
