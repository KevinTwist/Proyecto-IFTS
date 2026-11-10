import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DisponibilidadService } from '../services/disponibilidad.service';
import { TurnoService } from '../services/turno.service';
import { Disponibilidad } from '../models/disponibilidad.model';

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

@Component({
  selector: 'app-cliente',
  imports: [FormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {
  private readonly disponibilidadService = inject(DisponibilidadService);
  private readonly turnoService = inject(TurnoService);

  readonly disponibilidades = signal<Disponibilidad[]>([]);
  readonly cargando = signal(true);
  readonly mensajeEstado = signal('');
  readonly codigoTurnoCreado = signal('');
  readonly nombreCliente = signal('');
  readonly horarioSeleccionado = signal<Disponibilidad | null>(null);
  readonly mostrarFormularioDatos = signal(false);
  readonly enviando = signal(false);

  readonly mesActual = signal(new Date());
  readonly diaSeleccionado = signal<number | null>(null);

  readonly mesAnioActual = computed(
    () => `${MESES[this.mesActual().getMonth()]} ${this.mesActual().getFullYear()}`
  );

  readonly celdasCalendario = computed<(number | null)[]>(() => {
    const fecha = this.mesActual();
    const cantidad = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
    const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();
    const celdasVacias = (primerDia + 6) % 7;
    return [
      ...Array.from({ length: celdasVacias }, () => null),
      ...Array.from({ length: cantidad }, (_, i) => i + 1)
    ];
  });

  readonly horariosDelDia = computed(() => {
    const dia = this.diaSeleccionado();
    if (dia === null) {
      return [];
    }
    const fechaISO = this.fechaISO(dia);
    return this.disponibilidades().filter((d) => d.fecha === fechaISO);
  });

  readonly fechaSeleccionada = computed(() => {
    const dia = this.diaSeleccionado();
    if (dia === null) {
      return '';
    }
    const fecha = this.mesActual();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    return `${String(dia).padStart(2, '0')}/${mes}/${fecha.getFullYear()}`;
  });

  ngOnInit(): void {
    this.cargarDisponibilidades();
  }

  private fechaISO(dia: number): string {
    const fecha = this.mesActual();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    return `${fecha.getFullYear()}-${mes}-${String(dia).padStart(2, '0')}`;
  }

  cargarDisponibilidades(): void {
    this.cargando.set(true);
    this.disponibilidadService.obtenerDisponibilidades().subscribe({
      next: (data) => {
        this.disponibilidades.set(data);
        this.cargando.set(false);
        this.autoseleccionarDia();
      },
      error: () => {
        this.mensajeEstado.set('Error al cargar los horarios disponibles.');
        this.cargando.set(false);
      }
    });
  }

  private autoseleccionarDia(): void {
    if (this.diaSeleccionado() !== null) {
      return;
    }
    const primera = this.disponibilidades()[0];
    if (!primera) {
      return;
    }
    const [anio, mes, dia] = primera.fecha.split('-').map(Number);
    this.mesActual.set(new Date(anio, mes - 1, 1));
    this.diaSeleccionado.set(dia);
  }

  mesAnterior(): void {
    const fecha = this.mesActual();
    this.mesActual.set(new Date(fecha.getFullYear(), fecha.getMonth() - 1, 1));
    this.diaSeleccionado.set(null);
    this.horarioSeleccionado.set(null);
  }

  mesSiguiente(): void {
    const fecha = this.mesActual();
    this.mesActual.set(new Date(fecha.getFullYear(), fecha.getMonth() + 1, 1));
    this.diaSeleccionado.set(null);
    this.horarioSeleccionado.set(null);
  }

  seleccionarDia(dia: number): void {
    this.diaSeleccionado.set(dia);
    this.horarioSeleccionado.set(null);
    this.mensajeEstado.set('');
  }

  seleccionarTurno(item: Disponibilidad): void {
    this.horarioSeleccionado.set(item);
    this.mensajeEstado.set('');
  }

  irAFormularioDatos(): void {
    if (this.horarioSeleccionado()) {
      this.mostrarFormularioDatos.set(true);
      this.mensajeEstado.set('');
    }
  }

  volverASeleccion(): void {
    this.mostrarFormularioDatos.set(false);
  }

  confirmarTurnoFinal(): void {
    const nombre = this.nombreCliente().trim();
    const horario = this.horarioSeleccionado();

    if (!horario || !nombre) {
      this.mensajeEstado.set('Completá tu nombre y elegí un horario.');
      return;
    }

    if (nombre.length > 20) {
      this.mensajeEstado.set('El nombre no puede superar los 20 caracteres.');
      return;
    }

    if (this.enviando()) {
      return;
    }

    this.enviando.set(true);
    this.turnoService
      .crearTurno({ nombre, apellido: '', id_disponibilidad: horario.id_disponibilidad })
      .subscribe({
        next: (res) => {
          this.enviando.set(false);
          this.codigoTurnoCreado.set(res.turno.codigo);
          this.mostrarFormularioDatos.set(false);
          this.cargarDisponibilidades();
        },
        error: (error: HttpErrorResponse) => {
          this.enviando.set(false);

          if (error.status === 409) {
            this.mostrarFormularioDatos.set(false);
            this.horarioSeleccionado.set(null);
            this.mensajeEstado.set('El horario acaba de ser ocupado por otra persona. Elegí otro de la lista.');
            this.cargarDisponibilidades();
            return;
          }

          this.mensajeEstado.set('No se pudo concretar la reserva.');
        }
      });
  }

  reiniciarFlujo(): void {
    this.codigoTurnoCreado.set('');
    this.mostrarFormularioDatos.set(false);
    this.horarioSeleccionado.set(null);
    this.diaSeleccionado.set(null);
    this.nombreCliente.set('');
    this.mensajeEstado.set('');
    this.cargarDisponibilidades();
  }
}
