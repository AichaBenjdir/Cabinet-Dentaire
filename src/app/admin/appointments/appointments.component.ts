import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  isModalOpen = false;
  newAppointment = { patient: '', date: '', treatment: 'Consultation' };
  appointments = [
    { patient: 'John Doe', date: '2025-02-10T14:30', treatment: 'Consultation' },
    { patient: 'Marie Dupont', date: '2025-02-11T10:00', treatment: 'Extraction' },
  ];


  constructor(private router: Router) {}
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit() {
    this.appointments.push({ ...this.newAppointment });
    this.closeModal();
    this.newAppointment = { patient: '', date: '', treatment: 'Consultation' };

    this.router.navigate(['/appointments']);
  }
  
}
