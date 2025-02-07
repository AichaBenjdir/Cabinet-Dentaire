import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppointmentService } from 'src/app/appointment.service';

@Component({
  selector: 'app-liste-appointment',
  templateUrl: './liste-appointment.component.html',
  styleUrls: ['./liste-appointment.component.css']
})
export class ListeAppointmentComponent {
  
  appointments: any[] = [];
  newAppointment: any = {
    patient: '',
    date: '',
    traitement: ''
  };
  patients: any[] = [];
  isModalOpen: boolean = false;

  constructor(private rendezvousService: AppointmentService) { }

  ngOnInit(): void {
    this.loadRendezvous();
    this.loadPatients();
  }
  
  loadPatients(): void {
    this.rendezvousService.getPatients().subscribe((data: any[]) => {
      this.patients = data;
    });
  }
  

  loadRendezvous(): void {
    this.rendezvousService.getRendezvous().subscribe((data: any[]) => {
      this.appointments = data;
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
        this.newAppointment = {
          ...this.newAppointment,
          patient: `${selectedPatient.nom} ${selectedPatient.prenom}`
        };
      }
  
      console.log('🔍 Données envoyées au serveur:', this.newAppointment);
  
      this.rendezvousService.addRendezvous(this.newAppointment).subscribe(
        response => {
          console.log('✅ Rendez-vous ajouté avec succès:', response);
          this.loadRendezvous();
          this.newAppointment = { patient: '', date: '', traitement: '' };
          this.closeModal();
        },
        error => {
          console.error('❌ Erreur lors de l\'ajout du rendez-vous:', error);
        }
      );
    }
  }
  
  
  
}
