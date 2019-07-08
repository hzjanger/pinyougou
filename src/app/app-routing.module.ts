import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'managerAdmin',
    loadChildren: () => import('./layout/manager-admin/manager-admin.module')
      .then(module => module.ManagerAdminModule)
  },
  { path: '', redirectTo: 'managerAdmin', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
