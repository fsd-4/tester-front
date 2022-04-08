import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FanComponent } from './component/fan/fan.component';
import { SavolComponent } from './component/savol/savol.component';
import { UserComponent } from './component/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
      
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'fan',
        component: FanComponent
      },
      {
        path: 'savol',
        component: SavolComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
