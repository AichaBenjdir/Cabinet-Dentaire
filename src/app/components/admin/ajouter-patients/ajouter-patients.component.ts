import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';


interface Patient {
  id?: number;
  nom: string;
  prenom: string;
  telephone: string;
  dateNaissance: string;
  isEditing?: boolean; 
}

@Component({
  selector: 'app-ajouter-patients',
  templateUrl: './ajouter-patients.component.html',
  styleUrls: ['./ajouter-patients.component.css'],
})
export class AjouterPatientsComponent implements OnInit {
  patients: Patient[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    // Charger les patients depuis l'API lorsque le composant est initialisé
    this.loadPatients();
  }

  // Charger les patients
  loadPatients(): void {
    this.patientService.getPatients().subscribe((data) => {
      this.patients = data;
    });
  }

  addPatient(): void {
    const newPatient: Patient = { nom: '', prenom: '', telephone: '', dateNaissance: '', isEditing: true };
    this.patientService.addPatient(newPatient).subscribe((patient) => {
      this.patients.push(patient);  
    });
  }

  editPatient(index: number): void {
    
    this.patients[index].isEditing = true;
   
    this.successMessage = '';
    this.errorMessage = '';
  }
  
  savePatient(index: number): void {
   
    this.patients[index].isEditing = false;
    
    
    this.patientService.updatePatient(this.patients[index]).subscribe(() => {
      
      this.successMessage = 'Rendez-vous modifié avec succès !';
      this.errorMessage = '';  
    }, error => {
      
      this.errorMessage = 'Erreur lors de la modification du patient.';
      this.successMessage = '';  
    });
  }
  

  updatePatient(event: Event, index: number, field: keyof Patient): void {
    const value = (event.target as HTMLElement).innerText.trim();
    if (field === 'nom' || field === 'prenom' || field === 'telephone' || field === 'dateNaissance') {
      this.patients[index][field] = value;
      this.patientService.updatePatient(this.patients[index]).subscribe();  // Sauvegarder les modifications sur le serveur
    }
  }

 
  deletePatient(index: number): void {
    const patientToDelete = this.patients[index];
    this.patientService.deletePatient(patientToDelete.id!).subscribe(() => {
      this.patients.splice(index, 1);  // Supprimer le patient de la liste
      this.successMessage = 'Rendez-vous supprimé avec succès!';
      this.errorMessage = ''; 
    });
  }
}
