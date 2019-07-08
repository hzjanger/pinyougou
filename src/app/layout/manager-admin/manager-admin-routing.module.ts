import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManagerIndexComponent} from './manager-index/manager-index.component';
import {BrandManagerComponent} from './brand-manager/brand-manager.component';
import {SpecificationComponent} from './specification/specification.component';
import {TypeTemplateComponent} from './type-template/type-template.component';

const routes: Routes = [
  { path: '', component: ManagerIndexComponent, children: [
      { path: 'brandManager', component: BrandManagerComponent},
      { path: 'specification', component: SpecificationComponent},
      { path: 'typeTemplate', component: TypeTemplateComponent}

    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerAdminRoutingModule { }
