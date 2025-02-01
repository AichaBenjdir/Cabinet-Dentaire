import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';
// import { AppointmentsComponent } from './components/appointments/appointments.component';
// import { PatientsComponent } from './components/patients/patients.component';

import { AccueilComponent } from './pages/accueil/accueil.component';

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'appointments', component: AppointmentsComponent }, // Page des rendez-vous
  // { path: 'patients', component: PatientsComponent }, // Page des patients
  
  { path: '', component: AccueilComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirection vers la page de connexion par défaut
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
