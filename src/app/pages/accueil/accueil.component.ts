import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, OnDestroy {

  image = {
    src: 'assets/c2.jpg', 
    title: 'DR Zied BENJDIR',  
    descriptions: [
      'Cabinet Dentaire et d\'Implantologie',
      '5 ans d\'expérience, 30+ formations et diplômes'
    ],
    link: '/contactez-nous/'
  };

  currentDescriptionIndex: number = 0;
  currentDescription: string = this.image.descriptions[0];
  interval: any;

  ngOnInit(): void {
    // Lancer l'alternance des descriptions toutes les 2 secondes
    this.interval = setInterval(() => {
      this.currentDescriptionIndex = (this.currentDescriptionIndex + 1) % this.image.descriptions.length;
      this.currentDescription = this.image.descriptions[this.currentDescriptionIndex];
    }, 2000); // Changement toutes les 2 secondes
  }

  ngOnDestroy(): void {
    // Nettoyer l'intervalle pour éviter des fuites mémoire
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
