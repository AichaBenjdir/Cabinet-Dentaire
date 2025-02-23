import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';
// import { AppointmentsComponent } from './components/appointments/appointments.component';
// import { PatientsComponent } from './components/patients/patients.component';

import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { HomeComponent } from './components/admin/home/home.component';
import { AjouterPatientsComponent } from './components/admin/ajouter-patients/ajouter-patients.component';
import { AppointmentsComponent } from './components/admin/appointments/appointments.component';
import { TraitementsComponent } from './components/admin/traitements/traitements.component';
import { AccueilComponent } from './components/pages/accueil/accueil.component';
import { NosTraitementsComponent } from './components/pages/nos-traitements/nos-traitements.component';
import { AvantApresComponent } from './components/pages/avant-apres/avant-apres.component';
import { PrendreRDVComponent } from './components/pages/prendre-rdv/prendre-rdv.component';
import { LoginComponent } from './components/pages/login/login.component';


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
 { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
 { path: 'ajouter-patients', component: AjouterPatientsComponent, canActivate: [AuthGuard] },
 { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard] },
 
 { path: 'traitements', component: TraitementsComponent, canActivate: [AuthGuard] }




  // { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirection vers la page de connexion par défaut
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
