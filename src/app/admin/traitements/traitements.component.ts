import { Component, OnInit } from '@angular/core';
import { TraitementService } from 'src/app/traitement.service';

@Component({
  selector: 'app-traitements',
  templateUrl: './traitements.component.html',
  styleUrls: ['./traitements.component.css']
})
export class TraitementsComponent implements OnInit {

  patients: any[] = [];
  traitements: any[] = [];
  rendezVous: any[] = [];
  showForm: boolean = false;
  selectedTraitement: any = null;
  selectedStatus: string = 'Non confirmé'; // Statut par défaut
  newTraitement: any = {
    nom: '',
    traitement: '',
    statut: '',
    cout: ''
  };

  constructor(private traitementService: TraitementService) {}

  ngOnInit(): void {
    // Récupérer les données du service
    this.traitementService.getTraitements().subscribe((data) => {
      this.patients = data.patients;
      this.traitements = data.traitements;
      this.rendezVous = data.rendezVous;
    });
  }

  // Méthode pour afficher le formulaire d'ajout
  showAddPatientForm(): void {
    this.showForm = true;
  }

  // Méthode pour cacher le formulaire d'ajout
  hideAddPatientForm(): void {
    this.showForm = false;
  }

  // Méthode pour ajouter un traitement
  addTraitement(): void {
    // Envoie des données à votre service ou API ici
    const traitementToAdd = { ...this.newTraitement, statut: this.selectedStatus, traitement: this.selectedTraitement };
    console.log('Nouveau traitement à ajouter:', traitementToAdd);
    this.showForm = false;
  }

  // Méthode pour récupérer le nom du traitement par son ID
  getTraitementName(id: string): string {
    const traitement = this.traitements.find(t => t.id === id);
    return traitement ? traitement.name : 'Non spécifié';
  }

  // Méthode pour vérifier si un patient a un rendez-vous
  isPatientInRendezVous(patientNom: string): boolean {
    return this.rendezVous.some(rv => rv.patient === patientNom);
  }

  // Méthode pour éditer un traitement
  editTraitement(patientId: string): void {
    console.log('Édition du traitement pour le patient', patientId);
    // Ajoutez ici votre logique pour éditer le traitement
  }

  // Méthode pour supprimer un traitement
  deleteTraitement(patientId: string): void {
    console.log('Suppression du traitement pour le patient', patientId);
    // Ajoutez ici votre logique pour supprimer le traitement
  }
}
