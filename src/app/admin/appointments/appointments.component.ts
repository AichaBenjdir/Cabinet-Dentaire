import { Component } from '@angular/core';



interface RendezVous {
  patient: string;
  dateHeure: Date;
  type: string;
  statut: 'confirmé' | 'annulé' | 'en attente';
  
}


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {

  rendezVousList: RendezVous[] = [];
  modifierRendezVous(rdv: RendezVous): void {
    // Implémentation de la logique pour modifier un rendez-vous
    console.log('Modification du rendez-vous:', rdv);
  }
  annulerRendezVous(rdv: RendezVous): void {
    // Implémentation de la logique pour annuler un rendez-vous
    console.log('Annulation du rendez-vous:', rdv);
  }
  addRendezVous(patient: string, dateHeure: Date, type: string, statut: 'confirmé' | 'annulé' | 'en attente', medecin?: string, notes?: string) {
    const rendezVous: RendezVous = { patient, dateHeure, type, statut };
    this.rendezVousList.push(rendezVous);
  }
  
}
