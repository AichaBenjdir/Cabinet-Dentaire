import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { NosTraitementsComponent } from './pages/nos-traitements/nos-traitements.component';
import { AvantApresComponent } from './pages/avant-apres/avant-apres.component';
import { PrendreRDVComponent } from './pages/prendre-rdv/prendre-rdv.component';

import { AjouterPatientsComponent } from './admin/ajouter-patients/ajouter-patients.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './admin/home/home.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TraitementsComponent } from './admin/traitements/traitements.component';
import { CommonModule, DatePipe } from '@angular/common';
import { AppointmentsComponent } from './admin/appointments/appointments.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccueilComponent,
    NosTraitementsComponent,
    AvantApresComponent,
    PrendreRDVComponent,
    DashboardComponent,
    AjouterPatientsComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    TraitementsComponent,
    AppointmentsComponent,
    LoginComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule, 
    NgChartsModule,

    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
