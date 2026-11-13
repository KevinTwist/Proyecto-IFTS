import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cliente', pathMatch: 'full' },
  { path: 'cliente', component: ClienteComponent },
  { path: 'administrador', component: AdminComponent },
  { path: '**', redirectTo: 'cliente' }
];
