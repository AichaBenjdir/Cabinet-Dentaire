import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';
// import { AppointmentsComponent } from './components/appointments/appointments.component';
// import { PatientsComponent } from './components/patients/patients.component';

import { AccueilComponent } from './pages/accueil/accueil.component';
import { HomeComponent } from './admin/home/home.component';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { AjouterPatientsComponent } from './admin/ajouter-patients/ajouter-patients.component';
import { TraitementsComponent } from './admin/traitements/traitements.component';
import { AppointmentsComponent } from './admin/appointments/appointments.component';
import { NosTraitementsComponent } from './pages/nos-traitements/nos-traitements.component';
import { AvantApresComponent } from './pages/avant-apres/avant-apres.component';
import { PrendreRDVComponent } from './pages/prendre-rdv/prendre-rdv.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { ListeAppointmentComponent } from './admin/liste-appointment/liste-appointment.component';

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'appointments', component: AppointmentsComponent }, // Page des rendez-vous
  // { path: 'patients', component: PatientsComponent }, // Page des patients
  
  
 // Partie publique
 { path: '', redirectTo: '/accueil', pathMatch: 'full' },
 { path: 'accueil', component: AccueilComponent },
 { path: 'nos-traitement', component: NosTraitementsComponent },
 { path: 'avant-apres', component: AvantApresComponent},
 { path: 'prendre-rdv', component: PrendreRDVComponent },
 { path: 'login', component: LoginComponent },

 // Partie privée (protégée par AuthGuard)
 { path: '', component: HomeComponent},
 { path: 'dashbord', component: DashbordComponent, canActivate: [AuthGuard] },
 { path: 'ajouter-patients', component: AjouterPatientsComponent, canActivate: [AuthGuard] },
 { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard] },
 { path: 'liste-appointment', component: ListeAppointmentComponent, canActivate: [AuthGuard] },
 { path: 'traitements', component: TraitementsComponent, canActivate: [AuthGuard] }




  // { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirection vers la page de connexion par défaut
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
