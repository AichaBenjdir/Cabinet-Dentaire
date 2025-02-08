import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';  // Importer les types nécessaires pour les graphiques

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Déclaration des propriétés pour les données et options du graphique
  barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],  // Labels des mois (exemple)
    datasets: [
      {
        data: [65, 59, 80, 81, 56],  // Données correspondant à chaque mois
        label: 'Patients',  // Légende du graphique
        backgroundColor: 'rgba(77, 83, 96, 0.2)',  // Couleur de fond des barres
        borderColor: 'rgba(77, 83, 96, 1)',  // Couleur des bordures des barres
        borderWidth: 1  // Largeur des bordures des barres
      }
    ]
  };

  barChartOptions: ChartOptions = {
    responsive: true,  // Le graphique s'adapte à la taille de son conteneur
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mois'  // Titre de l'axe X
        }
      },
      y: {
        title: {
          display: true,
          text: 'Nombre'  // Titre de l'axe Y
        },
        beginAtZero: true  // L'axe Y commence à 0
      }
    }
  };

  totalPatients: number = 100;  // Exemple de données
  totalRdvToday: number = 15;  // Exemple de données
  totalTraitements: number = 20;  // Exemple de données

  constructor() { }

  ngOnInit(): void {
    // Logic ici si tu veux récupérer ou manipuler des données
  }
}
