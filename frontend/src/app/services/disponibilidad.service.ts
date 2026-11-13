import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Disponibilidad } from '../models/disponibilidad.model';

export interface CrearDisponibilidadPayload {
  date_disponible: string;
}

@Injectable({ providedIn: 'root' })
export class DisponibilidadService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/disponibilidades`;

  obtenerDisponibilidades(): Observable<Disponibilidad[]> {
    return this.http.get<Disponibilidad[]>(this.apiUrl);
  }

  crearDisponibilidad(payload: CrearDisponibilidadPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, payload);
  }

  eliminarDisponibilidad(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
