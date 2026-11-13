import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TurnoService } from '../services/turno.service';
import { DisponibilidadService } from '../services/disponibilidad.service';
import { Turno } from '../models/turno.model';
import { Disponibilidad } from '../models/disponibilidad.model';

@Component({
  selector: 'app-turno',
  imports: [FormsModule],
  templateUrl: './turno.component.html',
  styleUrl: './turno.component.css'
})
export class TurnoComponent {
  private readonly turnoService = inject(TurnoService);
  private readonly disponibilidadService = inject(DisponibilidadService);

  readonly codigo = signal('');
  readonly turno = signal<Turno | null>(null);
  readonly mensajeEstado = signal('');
  readonly mensajeExito = signal('');

  readonly editando = signal(false);
  readonly nuevoNombre = signal('');
  readonly nuevoHorario = signal<number | null>(null);
  readonly disponibilidades = signal<Disponibilidad[]>([]);

  buscar(): void {
    const codigo = this.codigo().trim().toUpperCase();
    this.mensajeEstado.set('');
    this.mensajeExito.set('');
    this.turno.set(null);
    this.editando.set(false);

    if (!codigo) {
      this.mensajeEstado.set('Ingresá el código de tu turno.');
      return;
    }

    this.turnoService.buscarTurno(codigo).subscribe({
      next: (data) => this.turno.set(data[0] ?? null),
      error: (error: HttpErrorResponse) => {
        this.mensajeEstado.set(
          error.status === 404 ? 'No se encontró un turno con ese código.' : 'Error al buscar el turno.'
        );
      }
    });
  }

  abrirEdicion(): void {
    const turno = this.turno();
    if (!turno) {
      return;
    }
    this.nuevoNombre.set(turno.nombre);
    this.nuevoHorario.set(null);
    this.editando.set(true);
    this.mensajeEstado.set('');
    this.mensajeExito.set('');

    this.disponibilidadService.obtenerDisponibilidades().subscribe({
      next: (data) => this.disponibilidades.set(data),
      error: () => this.mensajeEstado.set('Error al cargar los horarios disponibles.')
    });
  }

  guardarCambios(): void {
    const turno = this.turno();
    const nombre = this.nuevoNombre().trim();
    if (!turno) {
      return;
    }

    if (!nombre || nombre.length > 20) {
      this.mensajeEstado.set('El nombre es obligatorio y no puede superar los 20 caracteres.');
      return;
    }

    const payload = {
      nombre,
      idDisponibilidad: this.nuevoHorario() ?? undefined
    };

    this.turnoService.editarTurno(turno.codigo, payload).subscribe({
      next: (res) => {
        this.editando.set(false);
        this.codigo.set(res.codigo);
        this.buscar();
        this.mensajeExito.set(
          res.codigo !== turno.codigo
            ? `Turno actualizado. Tu nuevo código es ${res.codigo}.`
            : 'Turno actualizado.'
        );
      },
      error: (error: HttpErrorResponse) => {
        this.mensajeEstado.set(
          error.status === 409 ? 'Ese horario ya fue reservado. Elegí otro.' : 'No se pudo editar el turno.'
        );
      }
    });
  }

  cancelarTurno(): void {
    const turno = this.turno();
    if (!turno || !confirm('¿Seguro que querés cancelar tu turno?')) {
      return;
    }

    this.turnoService.eliminarTurno(turno.codigo).subscribe({
      next: () => {
        this.turno.set(null);
        this.codigo.set('');
        this.mensajeExito.set('Tu turno fue cancelado.');
      },
      error: () => this.mensajeEstado.set('No se pudo cancelar el turno.')
    });
  }
}
