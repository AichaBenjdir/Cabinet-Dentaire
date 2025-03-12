import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule, DatePipe } from '@angular/common';

import { RouterModule } from '@angular/router';


import { NgChartsModule } from 'ng2-charts';
import { NavbarComponent } from './components/pages/navbar/navbar.component';
import { AccueilComponent } from './components/pages/accueil/accueil.component';
import { NosTraitementsComponent } from './components/pages/nos-traitements/nos-traitements.component';
import { AvantApresComponent } from './components/pages/avant-apres/avant-apres.component';
import { PrendreRDVComponent } from './components/pages/prendre-rdv/prendre-rdv.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AjouterPatientsComponent } from './components/admin/ajouter-patients/ajouter-patients.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { HomeComponent } from './components/admin/home/home.component';

import { TraitementsComponent } from './components/admin/traitements/traitements.component';
import { AppointmentsComponent } from './components/admin/appointments/appointments.component';
import { LoginComponent } from './components/pages/login/login.component';




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
    TraitementsComponent,
    AppointmentsComponent,
    LoginComponent,
    PrendreRDVComponent,

    
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
