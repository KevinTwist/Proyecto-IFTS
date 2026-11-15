import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Disponibilidad, DisponibilidadAdmin } from '../models/disponibilidad.model';

export interface CrearDisponibilidadRespuesta {
  mensaje: string;
  disponibilidad: {
    id_disponibilidad: number;
    date_disponible: string;
  };
}

@Injectable({ providedIn: 'root' })
export class DisponibilidadService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/disponibilidades`;

  obtenerDisponibilidades(): Observable<Disponibilidad[]> {
    return this.http.get<Disponibilidad[]>(this.apiUrl);
  }

  obtenerTodasDisponibilidades(): Observable<DisponibilidadAdmin[]> {
    return this.http.get<DisponibilidadAdmin[]>(`${this.apiUrl}/todas`);
  }

  crearDisponibilidad(dateDisponible: string): Observable<CrearDisponibilidadRespuesta> {
    return this.http.post<CrearDisponibilidadRespuesta>(`${this.apiUrl}/create`, {
      date_disponible: dateDisponible
    });
  }

  eliminarDisponibilidad(id: number): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(`${this.apiUrl}/delete/${id}`);
  }
}
