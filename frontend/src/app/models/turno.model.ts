export interface Turno {
  turno_id: number;
  codigo: string;
  nombre: string;
  id_disponibilidad: number;
  fecha?: string;
  hora?: string;
  created_at?: string;
}
