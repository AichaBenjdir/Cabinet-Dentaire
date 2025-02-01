import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PatientsComponent } from './components/patients/patients.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { NosServicesComponent } from './pages/nos-services/nos-services.component';
import { NosTraitementsComponent } from './pages/nos-traitements/nos-traitements.component';
import { AvantApresComponent } from './pages/avant-apres/avant-apres.component';
import { PrendreRDVComponent } from './pages/prendre-rdv/prendre-rdv.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { AjouterPatientsComponent } from './admin/ajouter-patients/ajouter-patients.component';
import { FooterComponent } from './pages/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PatientsComponent,
    AppointmentsComponent,
    NavbarComponent,
    AccueilComponent,
    NosServicesComponent,
    NosTraitementsComponent,
    AvantApresComponent,
    PrendreRDVComponent,
    ContactComponent,
    DashbordComponent,
    AjouterPatientsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
