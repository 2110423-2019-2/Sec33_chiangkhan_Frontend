import { RouterModule ,Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { NavbarComponent } from './navbar/navbar.component';

const appRoutes: Routes = [
  { path: "", component: LoginFormComponent },
  { path: "register",  component: CreateFormComponent },
  
];
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    CreateFormComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule ,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
