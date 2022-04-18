import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { material_imports } from '../shared/material-import';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FanComponent } from './component/fan/fan.component';
import { SavolComponent } from './component/savol/savol.component';
import { VariantComponent } from './component/variant/variant.component';
import { UserComponent } from './component/user/user.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProfilComponent } from './component/profil/profil.component';


@NgModule({
  declarations: [
    AdminComponent,
    FanComponent,
    UserComponent,
    SavolComponent,
    VariantComponent,
    DashboardComponent,
    ProfilComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...material_imports
  ]
})
export class AdminModule { }
