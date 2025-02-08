import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppointmentService } from 'src/app/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  appointments: any[] = [];
  newAppointment: any = {
    patient: '',
    date: '',
    treatment: ''
  };
  patients: any[] = [];
  treatments: any[] = [];  // Liste des traitements
  isModalOpen: boolean = false;

  constructor(private rendezvousService: AppointmentService) { }

  ngOnInit(): void {
    this.loadRendezvous();
    this.loadPatients();
    this.loadTreatments();  // Charger les traitements
  }
  
  loadPatients(): void {
    this.rendezvousService.getPatients().subscribe((data: any[]) => {
      this.patients = data;
    });
  }

  loadTreatments(): void {
    this.rendezvousService.getTreatments().subscribe((data: any[]) => {
      this.treatments = data;
    });
  }

  loadRendezvous(): void {
    this.rendezvousService.getRendezvous().subscribe((data: any[]) => {
      this.appointments = data.map(appointment => {
        // Trouver le traitement correspondant à l'ID
        const treatment = this.treatments.find(t => t.id == appointment.treatment);
        return {
          ...appointment,
          treatmentName: treatment ? treatment.name : 'Traitement inconnu'  // Remplacer l'ID par le nom
        };
      });
    });
  }
  
  
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      // Trouver le patient sélectionné
      const selectedPatient = this.patients.find(p => p.id == this.newAppointment.patient);
      if (selectedPatient) {
        this.newAppointment = {
          ...this.newAppointment,
          patient: `${selectedPatient.nom} ${selectedPatient.prenom}`  // Ajouter le nom du patient
        };
      }
  
      // Trouver le traitement sélectionné par son nom
      const selectedTreatment = this.treatments.find(t => t.name === this.newAppointment.treatment);
      if (selectedTreatment) {
        this.newAppointment.treatment = selectedTreatment.id;  // Ajouter l'ID du traitement
      }
  
      // Vérifier si un rendez-vous est en cours de modification
      if (this.newAppointment.id) {
        // Modifier le rendez-vous existant
        this.rendezvousService.updateRendezvous(this.newAppointment).subscribe(
          response => {
            console.log('✅ Rendez-vous modifié avec succès:', response);
            this.loadRendezvous();  // Recharger la liste des rendez-vous
            this.newAppointment = { patient: '', date: '', treatment: '' };  // Réinitialiser le formulaire
            this.closeModal();
          },
          error => {
            console.error('❌ Erreur lors de la modification du rendez-vous:', error);
          }
        );
      } else {
        // Ajouter un nouveau rendez-vous
        this.rendezvousService.addRendezvous(this.newAppointment).subscribe(
          response => {
            console.log('✅ Rendez-vous ajouté avec succès:', response);
            this.loadRendezvous();  // Recharger la liste des rendez-vous
            this.newAppointment = { patient: '', date: '', treatment: '' };  // Réinitialiser le formulaire
            this.closeModal();
          },
          error => {
            console.error('❌ Erreur lors de l\'ajout du rendez-vous:', error);
          }
        );
      }
    }
  }
  
  


  deleteAppointment(appointmentId: string): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
      this.rendezvousService.deleteRendezvous(appointmentId).subscribe(
        () => {
          console.log('✅ Rendez-vous supprimé avec succès');
          this.loadRendezvous();  // Recharger la liste des rendez-vous après la suppression
        },
        error => {
          console.error('❌ Erreur lors de la suppression du rendez-vous:', error);
        }
      );
    }
  }
  
  editAppointment(appointment: any): void {
    this.newAppointment = { ...appointment };  // Pré-remplir les champs du formulaire
    this.openModal();  // Ouvrir le modal pour modifier le rendez-vous
  }
  
}
