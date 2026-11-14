import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DisponibilidadService } from '../services/disponibilidad.service';
import { DisponibilidadAdmin } from '../models/disponibilidad.model';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  private readonly disponibilidadService = inject(DisponibilidadService);

  readonly disponibilidades = signal<DisponibilidadAdmin[]>([]);
  readonly cargando = signal(true);
  readonly mensajeEstado = signal('');
  readonly mensajeError = signal(false);

  readonly fecha = signal('');
  readonly hora = signal('');
  readonly horarios = this.generarHorarios();
  readonly creando = signal(false);
  readonly eliminandoId = signal<number | null>(null);

  readonly totalLibres = computed(
    () => this.disponibilidades().filter((d) => !d.ocupada).length
  );
  readonly totalOcupadas = computed(
    () => this.disponibilidades().filter((d) => d.ocupada).length
  );

  ngOnInit(): void {
    this.cargarDisponibilidades();
  }

  cargarDisponibilidades(): void {
    this.cargando.set(true);
    this.disponibilidadService.obtenerTodasDisponibilidades().subscribe({
      next: (data) => {
        this.disponibilidades.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.mensajeError.set(true);
        this.mensajeEstado.set('No se pudieron cargar las disponibilidades.');
        this.cargando.set(false);
      }
    });
  }

  crearDisponibilidad(): void {
    const fecha = this.fecha().trim();
    const hora = this.hora().trim();

    this.mensajeEstado.set('');
    this.mensajeError.set(false);

    if (!fecha || !hora) {
      this.mensajeError.set(true);
      this.mensajeEstado.set('Completá la fecha y la hora.');
      return;
    }

    if (new Date(`${fecha}T${hora}`) <= new Date()) {
      this.mensajeError.set(true);
      this.mensajeEstado.set('No se pueden crear horarios en esta fecha.');
      return;
    }

    if (this.creando()) {
      return;
    }

    this.creando.set(true);
    this.disponibilidadService.crearDisponibilidad(`${fecha}T${hora}:00`).subscribe({
      next: () => {
        this.creando.set(false);
        this.fecha.set('');
        this.hora.set('');
        this.mensajeEstado.set('Disponibilidad creada con éxito.');
        this.cargarDisponibilidades();
      },
      error: (error: HttpErrorResponse) => {
        this.creando.set(false);
        this.mensajeError.set(true);
        this.mensajeEstado.set(
          error.error?.mensaje ?? 'No se pudo crear la disponibilidad.'
        );
      }
    });
  }

  eliminarDisponibilidad(item: DisponibilidadAdmin): void {
    if (item.ocupada) {
      return;
    }

    const confirmado = confirm(
      `¿Eliminar la disponibilidad del ${this.formatearFecha(item.fecha)} a las ${item.hora}?`
    );

    if (!confirmado) {
      return;
    }

    this.mensajeEstado.set('');
    this.mensajeError.set(false);
    this.eliminandoId.set(item.id_disponibilidad);

    this.disponibilidadService.eliminarDisponibilidad(item.id_disponibilidad).subscribe({
      next: () => {
        this.eliminandoId.set(null);
        this.mensajeEstado.set('Disponibilidad eliminada correctamente.');
        this.cargarDisponibilidades();
      },
      error: (error: HttpErrorResponse) => {
        this.eliminandoId.set(null);
        this.mensajeError.set(true);
        this.mensajeEstado.set(
          error.error?.mensaje ?? 'No se pudo eliminar la disponibilidad.'
        );
      }
    });
  }

  private generarHorarios(): string[] {
    const horarios: string[] = [];
    for (let hora = 8; hora <= 20; hora++) {
      for (const minutos of ['00', '15', '30', '45']) {
        horarios.push(`${String(hora).padStart(2, '0')}:${minutos}`);
      }
    }
    return horarios;
  }

  formatearFecha(fecha: string): string {
    const [anio, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${anio}`;
  }
}
