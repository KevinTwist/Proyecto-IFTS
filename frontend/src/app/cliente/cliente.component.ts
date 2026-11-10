import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DisponibilidadService } from '../services/disponibilidad.service';
import { TurnoService } from '../services/turno.service';
import { Disponibilidad } from '../models/disponibilidad.model';
import { Turno } from '../models/turno.model';

@Component({
  selector: 'app-cliente',
  imports: [ReactiveFormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {
  private readonly disponibilidadService = inject(DisponibilidadService);
  private readonly turnoService = inject(TurnoService);
  private readonly fb = inject(FormBuilder);

  readonly cargando = signal(true);
  readonly errorCarga = signal<string | null>(null);
  readonly disponibilidades = signal<Disponibilidad[]>([]);
  readonly seleccion = signal<Disponibilidad | null>(null);
  readonly enviando = signal(false);
  readonly errorReserva = signal<string | null>(null);
  readonly turnoReservado = signal<Turno | null>(null);

  readonly formulario = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.cargarDisponibilidades();
  }

  cargarDisponibilidades(): void {
    this.cargando.set(true);
    this.errorCarga.set(null);
    this.disponibilidadService.obtenerDisponibilidades().subscribe({
      next: (disponibilidades) => {
        this.disponibilidades.set(disponibilidades);
        this.cargando.set(false);
      },
      error: () => {
        this.errorCarga.set('No se pudo obtener los horarios disponibles.');
        this.cargando.set(false);
      }
    });
  }

  seleccionar(disponibilidad: Disponibilidad): void {
    this.seleccion.set(disponibilidad);
    this.errorReserva.set(null);
  }

  cancelarSeleccion(): void {
    this.seleccion.set(null);
    this.formulario.reset();
    this.errorReserva.set(null);
  }

  reservarOtro(): void {
    this.turnoReservado.set(null);
  }

  confirmarReserva(): void {
    if (this.enviando() || this.seleccion() === null) {
      return;
    }

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { nombre, apellido } = this.formulario.getRawValue();
    const nombreCompleto = `${nombre} ${apellido}`.trim();

    if (nombreCompleto.length > 20) {
      this.errorReserva.set('El nombre y el apellido juntos no pueden superar 20 caracteres.');
      return;
    }

    const disponibilidadElegida = this.seleccion()!;

    this.enviando.set(true);
    this.errorReserva.set(null);

    this.turnoService
      .crearTurno({ nombre, apellido, id_disponibilidad: disponibilidadElegida.id_disponibilidad })
      .subscribe({
        next: (respuesta) => {
          this.turnoReservado.set({
            ...respuesta.turno,
            fecha: disponibilidadElegida.fecha,
            hora: disponibilidadElegida.hora
          });
          this.enviando.set(false);
          this.cancelarSeleccion();
          this.cargarDisponibilidades();
        },
        error: (error: HttpErrorResponse) => {
          this.enviando.set(false);

          if (error.status === 409) {
            this.seleccion.set(null);
            this.errorReserva.set('El horario acaba de ser ocupado por otra persona. Elegí otro de la lista.');
            this.cargarDisponibilidades();
            return;
          }

          this.errorReserva.set(error.error?.mensaje ?? 'No se pudo conectar con el servidor. Intentá de nuevo.');
        }
      });
  }
}
