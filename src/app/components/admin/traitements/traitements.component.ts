import { Component, OnInit } from '@angular/core';
import { Traitement } from 'src/app/modules/traitement/traitement.module';
import { TraitementService } from 'src/app/services/traitement.service';

@Component({
  selector: 'app-traitements',
  templateUrl: './traitements.component.html',
  styleUrls: ['./traitements.component.css']
})
export class TraitementsComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';
  traitements: Traitement[] = [];
  newTraitement: Traitement = { type: '', description: '', cout: 0, duree: 0 };
  showModal = false;
  selectedTraitement: Traitement | null = null;
  constructor(private traitementService: TraitementService) { }

  ngOnInit(): void {
    this.traitementService.getTraitements().subscribe((data: Traitement[]) => {
      this.traitements = data;
    }, error => {
      this.errorMessage = 'Erreur lors du chargement des traitements';
    });
  }

  openAddTraitementModal(): void {
    this.showModal = true;
    this.newTraitement = { type: '', description: '', cout: 0, duree: 0 };  
  }

  closeAddTraitementModal(): void {
    this.showModal = false;
    this.successMessage = '';
    this.errorMessage = '';
  }

  addTraitement(): void {
    if (!this.newTraitement.type || !this.newTraitement.description) {
      this.errorMessage = 'Veuillez remplir tous les champs !';
      return;
    }

    this.traitementService.addTraitement(this.newTraitement).subscribe(
      (traitementAjoute) => {
        this.traitements.push(traitementAjoute);
        this.closeAddTraitementModal(); 
        this.successMessage = 'Traitement ajouté avec succès !';
      },
      error => {
        this.errorMessage = 'Erreur lors de l\'ajout du traitement';
      }
    );
  }

  editTraitement(traitement: Traitement): void {
    this.selectedTraitement = { ...traitement };
    this.newTraitement = { ...traitement };
    this.showModal = true;
  }

  deleteTraitement(id: number | undefined) {
    if (id === undefined) {
      this.errorMessage = 'Erreur : ID du traitement indéfini';
      return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer ce traitement ?')) {
      this.traitementService.deleteTraitement(id).subscribe(
        () => {
          this.traitements = this.traitements.filter(t => t.id !== id);
          this.successMessage = 'Traitement supprimé avec succès !';
          this.errorMessage = '';
        },
        error => {
          this.errorMessage = 'Erreur lors de la suppression du traitement';
          this.successMessage = '';
        }
      );
    }
  }

  updateTraitement(): void {
    if (!this.newTraitement.type || !this.newTraitement.description || !this.newTraitement.id) {
      this.errorMessage = 'Veuillez remplir tous les champs et vérifier l\'ID !';
      return;
    }

    this.traitementService.updateTraitement(this.newTraitement).subscribe(
      (traitementMisAJour) => {
        const index = this.traitements.findIndex(t => t.id === traitementMisAJour.id);
        if (index !== -1) {
          this.traitements[index] = traitementMisAJour;
          this.successMessage = 'Traitement mis à jour avec succès !';
        } else {
          this.errorMessage = 'Traitement à mettre à jour introuvable.';
        }
        this.closeAddTraitementModal();
        this.newTraitement = { type: '', description: '', cout: 0, duree: 0 };
        this.selectedTraitement = null;
      },
      error => {
        this.errorMessage = 'Erreur lors de la mise à jour du traitement';
      }
    );
  }
}
