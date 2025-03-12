import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';


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
      console.log(" Traitements récupérés :", data);
      this.treatments = data;
      this.loadRendezvous();
    }, error => {
      console.error(" Erreur chargement traitements :", error);
    });
  }
  
  
  loadRendezvous(): void {
    this.rendezvousService.getRendezvous().subscribe((data: any[]) => {
      console.log(" Rendez-vous récupérés :", data);
      console.log(" Traitements disponibles :", this.treatments);
  
      this.appointments = data.map(appointment => {
        const treatment = this.treatments.find(t => t.id === appointment.treatment);
        return {
          ...appointment,
          treatmentName: treatment ? treatment.type : ' Traitement introuvable'
        };
      });
  
      console.log("Rendez-vous après association :", this.appointments);
    }, error => {
      console.error(" Erreur chargement rendez-vous :", error);
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
      const selectedPatient = this.patients.find(p => p.id == this.newAppointment.patient);
      if (selectedPatient) {
        this.newAppointment.patient = `${selectedPatient.nom} ${selectedPatient.prenom}`;
      }
  
      // 🛠 Correction ici : comparer l'ID au lieu du nom
      const selectedTreatment = this.treatments.find(t => t.id == this.newAppointment.treatment);
      if (selectedTreatment) {
        this.newAppointment.treatment = selectedTreatment.id;
      }
  
      if (this.newAppointment.id) {
        this.rendezvousService.updateRendezvous(this.newAppointment).subscribe(
          response => {
            console.log(' Rendez-vous modifié:', response);
            this.loadRendezvous();
            this.newAppointment = { patient: '', date: '', treatment: '' };
            this.closeModal();
          },
          error => console.error('Erreur de modification:', error)
        );
      } else {
        this.rendezvousService.addRendezvous(this.newAppointment).subscribe(
          response => {
            console.log('Rendez-vous ajouté:', response);
            this.loadRendezvous();
            this.newAppointment = { patient: '', date: '', treatment: '' };
            this.closeModal();
          },
          error => console.error('Erreur d\'ajout:', error)
        );
      }
    }
  }
  
  


  deleteAppointment(appointmentId: string): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
      this.rendezvousService.deleteRendezvous(appointmentId).subscribe(
        () => {
          console.log(' Rendez-vous supprimé avec succès');
          this.loadRendezvous();  // Recharger la liste des rendez-vous après la suppression
        },
        error => {
          console.error('Erreur lors de la suppression du rendez-vous:', error);
        }
      );
    }
  }
  
  editAppointment(appointment: any): void {
    this.newAppointment = { ...appointment };  // Pré-remplir les champs du formulaire
    this.openModal();  // Ouvrir le modal pour modifier le rendez-vous
  }
  
}
