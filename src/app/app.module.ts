import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { RouterModule ,Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReviewComponent } from './review/review.component';
import { ReservationCarComponent } from './reservation-car/reservation-car.component';
import { ReviewPopupComponent } from './review-popup/review-popup.component';

import { ListofcarsComponent } from './listofcars/listofcars.component';
import { ReservationsComponent } from './reservations/reservations.component';

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register",  component: RegisterComponent },
  { path: "homepage", component:HomepageComponent } ,
  { path: "homepage/reservation", component:ReservationComponent } ,
  { path: "homepage/profile", component:ProfileComponent },
  { path: "homepage/listofcars", component:ListofcarsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    NavbarComponent,
    ProfileComponent,
    ReservationComponent,
    ReservationCarComponent,
    ReviewComponent,
    ReviewPopupComponent,
    ListofcarsComponent,
    ReservationsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule ,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
