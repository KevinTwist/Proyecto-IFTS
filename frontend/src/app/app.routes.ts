import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { TurnoComponent } from './turno/turno.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: '', component: ClienteComponent },
  { path: 'turno', component: TurnoComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];
