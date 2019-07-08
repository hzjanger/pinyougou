import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerAdminRoutingModule } from './manager-admin-routing.module';
import { ManagerIndexComponent } from './manager-index/manager-index.component';
import { ManagerNavComponent } from './manager-nav/manager-nav.component';
import {SharedModule} from '../../shared/shared.module';
import {BrandManagerComponent} from './brand-manager/brand-manager.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SpecificationComponent } from './specification/specification.component';
import { TypeTemplateComponent } from './type-template/type-template.component';

@NgModule({
  declarations: [
    ManagerIndexComponent,
    ManagerNavComponent,
    BrandManagerComponent,
    SpecificationComponent,
    TypeTemplateComponent
  ],
  imports: [
    CommonModule,
    ManagerAdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ManagerAdminModule { }
