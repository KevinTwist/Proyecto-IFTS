
import { Component, input, output } from '@angular/core';
import { Turno } from '../models/turno.model';

@Component({
  selector: 'app-confirmacion-turno',
  standalone: true,
  templateUrl: './confirmacion-turno.html',
  styleUrl: './confirmacion-turno.css'
})
export class ConfirmacionTurnoComponent {

  readonly turno = input.required<Turno>();

  readonly volver = output<void>();

}

