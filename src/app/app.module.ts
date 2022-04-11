import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
//Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { DeleteDialog } from './shared/delete-dialog.component';

import { MyFilterService } from './core/my-filter.service';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';
import { material_imports } from './shared/material-import';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './public/register/register.component';



@NgModule({
  declarations: [
    AppComponent,
    DeleteDialog,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...material_imports,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyFilterService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
