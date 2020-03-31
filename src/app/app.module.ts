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
import { ProfileComponent } from './profile/profile.component';
import { MyReservationComponent } from './myreservation/myreservation.component';
import { ReviewComponent } from './review/review.component';
import { MyReservationCarComponent } from './myreservation-car/myreservation-car.component';
import { MyreservationPopupComponent } from './myreservation-popup/myreservation-popup.component';
import { ListofcarsComponent } from './listofcars/listofcars.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { CarComponent } from './car/car.component';
import { BoxComponent } from './box/box.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddcarformComponent } from './addcarform/addcarform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomepageCarComponent } from './homepage-car/homepage-car.component';
import { HomepageCarPopupComponent } from './homepage-car-popup/homepage-car-popup.component';
import { HomepageCarReservationsComponent } from './homepage-car-reservations/homepage-car-reservations.component';
import { HomepageCarReservationsPopupComponent } from './homepage-car-reservations-popup/homepage-car-reservations-popup.component';
import { HomepageCarReservationsReserveconfirmPopupComponent } from './homepage-car-reservations-reserveconfirm-popup/homepage-car-reservations-reserveconfirm-popup.component';
import { AgmCoreModule } from '@agm/core';
import { AuthService } from './auth.service';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import {SlideshowModule} from 'ng-simple-slideshow';

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register",  component: RegisterComponent },
  { path: "homepage", component:HomepageComponent } ,
  { path: "homepage/reservation", component:MyReservationComponent } ,
  { path: "homepage/profile", component:ProfileComponent },
  { path: "homepage/listofcars", component:ListofcarsComponent },
  { path: "homepage/mycar" , component:BoxComponent },
  { path: "homepage/HomepageCarReservations", component:HomepageCarReservationsComponent},
  { path: "aboutus", component:AboutusComponent}
];   


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    NavbarComponent, 
    ProfileComponent,
    MyReservationComponent,
    MyReservationCarComponent,
    ReviewComponent,
    MyreservationPopupComponent,
    ListofcarsComponent,
    ReservationsComponent,
    CarComponent,
    BoxComponent,
    PopUpComponent,
    NavbarComponent,
    AddcarformComponent,
    HomepageCarComponent,
    HomepageCarPopupComponent,
    HomepageCarReservationsComponent,
    HomepageCarReservationsPopupComponent,
    HomepageCarReservationsReserveconfirmPopupComponent,
    AppFooterComponent,
    AboutusComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule ,
    ReactiveFormsModule ,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    SlideshowModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB-0c0j8f41aRTUyGLZdFhBEF-7TPwnZOQ',
      libraries: ['places']
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
