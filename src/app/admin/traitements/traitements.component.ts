import { Component, OnInit } from '@angular/core';
import { TraitementService } from 'src/app/traitement.service';
import { Traitement } from 'src/app/traitement/traitement.module';

@Component({
  selector: 'app-traitements',
  templateUrl: './traitements.component.html',
  styleUrls: ['./traitements.component.css']
})
export class TraitementsComponent implements OnInit {

  traitements: Traitement[] = [];
  newTraitement: Traitement = { type: '', description: '', cout: 0, duree: 0 };
  showModal = false;
  selectedTraitement: Traitement | null = null; // Assurez-vous que selectedTraitement est bien de type Traitement

  constructor(private traitementService: TraitementService) { }

  ngOnInit(): void {
    // Récupérer les traitements au chargement du composant
    this.traitementService.getTraitements().subscribe((data: Traitement[]) => {
      this.traitements = data;
    });
  }

  // Ouvrir le modal pour ajouter un traitement
  openAddTraitementModal(): void {
    this.showModal = true;
    this.newTraitement = { type: '', description: '', cout: 0, duree: 0 };  // Réinitialiser avant d'ajouter
  }

  // Fermer le modal pour ajouter un traitement
  closeAddTraitementModal(): void {
    this.showModal = false;
  }

  // Ajouter un traitement
  addTraitement(): void {
    if (!this.newTraitement.type || !this.newTraitement.description) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    this.traitementService.addTraitement(this.newTraitement).subscribe((traitementAjoute) => {
      this.traitements.push(traitementAjoute); // Ajoute le traitement dans la liste affichée
      this.closeAddTraitementModal(); // Ferme le modal après l'ajout
    }, error => {
      console.error('Erreur lors de l\'ajout du traitement', error); // Gestion d'erreur
    });
  }

  // Modifier un traitement
  editTraitement(traitement: Traitement): void {
    this.selectedTraitement = { ...traitement };  // Copie les données du traitement sélectionné dans selectedTraitement
    this.newTraitement = { ...traitement };  // Remplir newTraitement avec les données
    this.showModal = true;  // Ouvre le modal
  }

  // Supprimer un traitement
  deleteTraitement(id: number | undefined) {
    if (id === undefined) {
      console.error("Erreur : ID du traitement indéfini");
      return;
    }
    this.traitements = this.traitements.filter(t => t.id !== id);
  }

  // Mettre à jour un traitement
  updateTraitement(): void {
    if (!this.newTraitement.type || !this.newTraitement.description || !this.newTraitement.id) {
      alert("Veuillez remplir tous les champs et vérifier l'ID !");
      return;
    }

    // Mettre à jour le traitement via le service
    this.traitementService.updateTraitement(this.newTraitement).subscribe((traitementMisAJour) => {
      // Trouver l'index du traitement existant
      const index = this.traitements.findIndex(t => t.id === traitementMisAJour.id);

      if (index !== -1) {
        // Remplacer l'ancien traitement par le nouveau
        this.traitements[index] = traitementMisAJour;
      } else {
        console.error("Traitement à mettre à jour introuvable.");
      }

      this.closeAddTraitementModal();
      this.newTraitement = { type: '', description: '', cout: 0, duree: 0 };  // Réinitialisation après mise à jour
      this.selectedTraitement = null; // Réinitialiser l'élément sélectionné
    }, error => {
      console.error('Erreur lors de la mise à jour du traitement', error);
    });
  }
}
