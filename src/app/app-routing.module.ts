import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { NewComponent } from './pages/new/new.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "usuarios", component: UsuariosComponent },
  { path: "new", component: NewComponent },
  { path: "details", component: DetalhesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
