import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TurnoService } from '../services/turno.service';
import { DisponibilidadService } from '../services/disponibilidad.service';
import { Turno } from '../models/turno.model';
import { Disponibilidad } from '../models/disponibilidad.model';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  private readonly turnoService = inject(TurnoService);
  private readonly disponibilidadService = inject(DisponibilidadService);

  readonly turnos = signal<Turno[]>([]);
  readonly disponibilidades = signal<Disponibilidad[]>([]);
  readonly nuevaFecha = signal('');
  readonly mensajeEstado = signal('');
  readonly mensajeExito = signal('');

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.turnoService.leerTurnos().subscribe({
      next: (data) => this.turnos.set(data),
      error: () => this.mensajeEstado.set('Error al cargar los turnos.')
    });

    this.disponibilidadService.obtenerDisponibilidades().subscribe({
      next: (data) => this.disponibilidades.set(data),
      error: () => this.mensajeEstado.set('Error al cargar los horarios.')
    });
  }

  crearDisponibilidad(): void {
    this.limpiarMensajes();
    const fecha = this.nuevaFecha();

    if (!fecha) {
      this.mensajeEstado.set('Elegí una fecha y hora.');
      return;
    }

    this.disponibilidadService.crearDisponibilidad({ date_disponible: `${fecha}:00` }).subscribe({
      next: () => {
        this.nuevaFecha.set('');
        this.mensajeExito.set('Horario creado.');
        this.cargarDatos();
      },
      error: () => this.mensajeEstado.set('No se pudo crear el horario.')
    });
  }

  eliminarDisponibilidad(id: number): void {
    this.limpiarMensajes();
    if (!confirm('¿Eliminar este horario?')) {
      return;
    }

    this.disponibilidadService.eliminarDisponibilidad(id).subscribe({
      next: () => {
        this.mensajeExito.set('Horario eliminado.');
        this.cargarDatos();
      },
      error: (error: HttpErrorResponse) => {
        this.mensajeEstado.set(
          error.status === 409 ? 'Ese horario tiene un turno reservado.' : 'No se pudo eliminar el horario.'
        );
      }
    });
  }

  eliminarTurno(codigo: string): void {
    this.limpiarMensajes();
    if (!confirm(`¿Eliminar el turno ${codigo}?`)) {
      return;
    }

    this.turnoService.eliminarTurno(codigo).subscribe({
      next: () => {
        this.mensajeExito.set('Turno eliminado.');
        this.cargarDatos();
      },
      error: () => this.mensajeEstado.set('No se pudo eliminar el turno.')
    });
  }

  private limpiarMensajes(): void {
    this.mensajeEstado.set('');
    this.mensajeExito.set('');
  }
}
