import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from '../admin/appointments/appointments.component';

@NgModule({
  declarations: [
    AppointmentsComponent  // Ajoutez votre composant ici
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppointmentsComponent  // Si vous voulez exporter le composant pour l'utiliser ailleurs
  ]
})
export class AppointmentsModule { }
