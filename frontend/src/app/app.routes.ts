import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { TurnoComponent } from './turno/turno.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cliente', pathMatch: 'full' },
  { path: 'cliente', component: ClienteComponent },
  { path: 'turno', component: TurnoComponent },
  { path: 'administrador', component: AdminComponent },
  { path: '**', redirectTo: 'cliente' }
];
