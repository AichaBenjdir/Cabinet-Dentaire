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
  successMessage: string = '';
  errorMessage: string = '';
  newAppointment: any = {
    patient: '',
    date: '',
    traitement: ''
  };
  patients: any[] = [];
  traitements: any[] = [];  // Liste des traitements
  isModalOpen: boolean = false;

  constructor(private rendezvousService: AppointmentService) { }

  ngOnInit(): void {
    this.loadRendezvous();
    this.loadPatients();
    this.loadTraitements();  // Charger les traitements
  }
  
  loadPatients(): void {
    this.rendezvousService.getPatients().subscribe((data: any[]) => {
      this.patients = data;
    });
  }
  loadTraitements(): void {
    this.rendezvousService.getTraitements().subscribe((data: any[]) => {
      console.log('Traitements chargés :', data);
      this.traitements = data;
    });
  }
  
  
  
  loadRendezvous(): void {
    this.rendezvousService.getRendezvous().subscribe((data: any[]) => {
      console.log("Rendez-vous récupérés :", data);
      
      this.appointments = data.map(appointment => {
        const traitement = this.traitements.find(t => t.id === appointment.traitement);
        return {
          ...appointment,
          traitementName: traitement ? traitement.type : 'Traitement introuvable'
        };
      });
      console.log("Rendez-vous après association :", this.appointments);
    }, error => {
      console.error("Erreur de chargement des rendez-vous :", error);
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
      // Trouver et affecter le patient sélectionné
      const selectedPatient = this.patients.find(p => p.id == this.newAppointment.patient);
      if (selectedPatient) {
        this.newAppointment.patient = `${selectedPatient.nom} ${selectedPatient.prenom}`;
      }
  
    
      const selectedTraitement = this.traitements.find(t => t.id == this.newAppointment.traitement);
      if (selectedTraitement) {
        this.newAppointment.traitement = selectedTraitement.id;  
      } else {
        console.error("Traitement non trouvé !");
      }
  
      // Envoi du rendez-vous à l'API
      if (this.newAppointment.id) {
        this.rendezvousService.updateRendezvous(this.newAppointment).subscribe(
          response => {
            console.log('Rendez-vous modifié:', response);
            this.loadRendezvous();
            this.newAppointment = { patient: '', date: '', traitement: '' };
            this.closeModal();
          },
          error => console.error('Erreur de modification:', error)
        );
      } else {
        this.rendezvousService.addRendezvous(this.newAppointment).subscribe(
          response => {
            console.log('Rendez-vous ajouté:', response);
            this.loadRendezvous();
            this.newAppointment = { patient: '', date: '', traitement: '' };
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
          console.log('Rendez-vous supprimé avec succès');
          this.loadRendezvous();  // Recharger la liste des rendez-vous après la suppression
          this.successMessage = 'Rendez-vous supprimé avec succès!';
          this.errorMessage = '';  // Réinitialiser l'erreur si tout se passe bien
        },
        error => {
          console.error('Erreur lors de la suppression du rendez-vous:', error);
          this.errorMessage = 'Erreur lors de la suppression du rendez-vous.';
          this.successMessage = '';  // Réinitialiser le message de succès si une erreur se produit
        }
      );
    }
  }
  
  
  editAppointment(appointment: any): void {
    this.newAppointment = { ...appointment };  // Pré-remplir les champs du formulaire
    this.openModal();  // Ouvrir le modal pour modifier le rendez-vous
  }
  
}
