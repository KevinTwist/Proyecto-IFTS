import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Disponibilidad } from '../models/disponibilidad.model';

@Injectable({ providedIn: 'root' })
export class DisponibilidadService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/disponibilidades`;

  obtenerDisponibilidades(): Observable<Disponibilidad[]> {
    return this.http.get<Disponibilidad[]>(this.apiUrl);
  }
}
