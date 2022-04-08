import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,

  },
  {
    path: 'admin',
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: 'user',
    loadChildren: () => import("./user/user.module").then(m => m.UserModule)
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
