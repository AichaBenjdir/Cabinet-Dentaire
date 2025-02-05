import { Component } from '@angular/core';

interface Patient {
  nom: string;
  prenom: string;
  telephone: string;
  dateNaissance: string;
  isEditing?: boolean; 
}


@Component({
  selector: 'app-ajouter-patients',
  templateUrl: './ajouter-patients.component.html',
  styleUrls: ['./ajouter-patients.component.css']
})
export class AjouterPatientsComponent {
  patients: Patient[] = [
    { nom: 'John', prenom: 'Doe', telephone: '55826987', dateNaissance: '1990-01-01', isEditing: false 
      
     }
  ];
  
  addPatient() {
    this.patients.push({ nom: '', prenom: '', telephone: '', dateNaissance: '', isEditing: true });
  }
  
  editPatient(index: number) {
    this.patients[index].isEditing = true;
  }
  
  updatePatient(event: Event, index: number, field: keyof Patient) {
    const value = (event.target as HTMLElement).innerText.trim();
    // Ensure you're assigning a value that matches the type of the field
    if (field === 'nom' || field === 'prenom' || field === 'telephone' || field === 'dateNaissance') {
      this.patients[index][field] = value;
    }
  }
  
  
  savePatient(index: number) {
    this.patients[index].isEditing = false;
  }
  
  deletePatient(index: number) {
    this.patients.splice(index, 1);
  }
}  