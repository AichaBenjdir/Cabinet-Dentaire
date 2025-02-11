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
      '5 ans d\'expérience, 15+ formations et diplômes'
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

  slides = [
    {
      image: 'assets/c2.jpg',
      alt: 'Blanchiment Dentaire',
      title: 'Le Blanchiment Dentaire',
      description: `Il permet d’éclaircir la couleur des dents en appliquant un produit de blanchiment. Une séance sera réalisée au cabinet.`
    },
    {
      image: 'assets/c-dentaire.png',
      alt: 'Orthodontie Invisible',
      title: `L’Orthodontie Invisible`,
      description: `C’est une solution confortable et esthétique pour aligner les dents par une série de gouttières transparentes.`
    },
    {
      image: 'assets/c2.jpg',
      alt: 'Traitement des Fluoroses',
      title: `Le Traitement des Fluoroses Dentaires`,
      description: `Il comporte différentes phases : le blanchiment, la micro abrasion et l’infiltration à la résine composite.`
    }
  ];
  
  activeIndex = 0;
  
  constructor() { }
  
  prevSlide(): void {
    this.activeIndex = (this.activeIndex > 0) ? this.activeIndex - 1 : this.slides.length - 1;
  }
  
  nextSlide(): void {
    this.activeIndex = (this.activeIndex < this.slides.length - 1) ? this.activeIndex + 1 : 0;
  }
}