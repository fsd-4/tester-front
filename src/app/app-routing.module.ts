import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FanComponent } from './entity/fan/fan.component';
import { SavolComponent } from './entity/savol/savol.component';
import { UserComponent } from './entity/user/user.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
