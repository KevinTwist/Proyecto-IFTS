import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Turno } from '../models/turno.model';

export interface CrearTurnoPayload {
  nombre: string;
  apellido: string;
  id_disponibilidad: number;
}

export interface CrearTurnoRespuesta {
  mensaje: string;
  turno: Turno;
}

export interface EditarTurnoPayload {
  nombre?: string;
  idDisponibilidad?: number;
}

@Injectable({ providedIn: 'root' })
export class TurnoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/turnos`;

  crearTurno(payload: CrearTurnoPayload): Observable<CrearTurnoRespuesta> {
    return this.http.post<CrearTurnoRespuesta>(this.apiUrl, payload);
  }

  leerTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl);
  }

  buscarTurno(codigo: string): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}/${codigo}`);
  }

  editarTurno(codigo: string, payload: EditarTurnoPayload): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${codigo}`, payload);
  }

  eliminarTurno(codigo: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${codigo}`);
  }
}
