import { Component } from '@angular/core';
import { ClienteComponent } from './cliente/cliente.component';

@Component({
  imports: [ClienteComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
