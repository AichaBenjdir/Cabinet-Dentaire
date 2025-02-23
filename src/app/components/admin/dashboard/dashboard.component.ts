import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

import Chart from 'chart.js/auto';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('pieCanvas') pieCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Patients',
        backgroundColor: 'rgba(77, 83, 96, 0.2)',
        borderColor: 'rgba(77, 83, 96, 1)',
        borderWidth: 1
      }
    ]
  };

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Mois' } },
      y: { title: { display: true, text: 'Nombre' }, beginAtZero: true }
    }
  };

  totalPatients: number = 0;
  totalRdvToday: number = 0;
  totalTraitements: number = 0;
  patients: any[] = [];
  chart: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadPatientsByMonth();  // Charger les patients par mois
    this.loadPatients();         // Charger tous les patients
    this.loadRendezvous();       // Charger les rendez-vous
    this.loadTraitements();      // Charger les traitements
  }

  ngAfterViewInit(): void {
    console.log("Références Canvas:", this.pieCanvas);
    
    // Charger les données avant d'initialiser le graphique
    this.loadPatientsByMonth();
    
    setTimeout(() => {
      console.log(" Initialisation des graphiques...");
      this.initChart();
    }, 1000); // Augmenter légèrement le délai pour garantir le chargement des données
  }
  
  

  
  loadPatients(): void {
    this.dashboardService.getPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
        this.totalPatients = patients.length;
      },
      error: (err) => console.error("Erreur lors de la récupération des patients :", err)
    });
  }

  loadRendezvous(): void {
    this.dashboardService.getRendezvous().subscribe({
      next: (rendezvous) => this.totalRdvToday = rendezvous.length,
      error: (err) => console.error("Erreur lors de la récupération des rendez-vous :", err)
    });
  }

  loadTraitements(): void {
    this.dashboardService.getTraitements().subscribe({
      next: (traitements) => this.totalTraitements = traitements.length,
      error: (err) => console.error("Erreur lors de la récupération des traitements :", err)
    });
  }

  getRendezvousForPatient(patientId: string): string {
    const rendezvous = this.patients.find(patient => patient.id === patientId)?.rendezvous;
    return rendezvous ? rendezvous[0].date : 'No appointments';
  }

  getTraitementForPatient(patientId: string): string {
    const patient = this.patients.find(patient => patient.id === patientId);
    return patient ? patient.traitements.map((t: { type: any }) => t.type).join(', ') : 'No treatments';
  }

  initChart() {
    const pieCtx = this.pieCanvas.nativeElement.getContext('2d');
    
    // Graphique circulaire (pie chart)
    if (pieCtx) {
      new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: ['Traitements', 'Patients', 'Rendez-vous'], // Ajouter 'Rendez-vous'
          datasets: [{
            data: [this.totalTraitements, this.totalPatients, this.totalRdvToday], // Ajouter totalRdvToday
            backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'], // Ajouter une couleur pour les rendez-vous
            hoverBackgroundColor: ['#ff4562', '#4fa3fd', '#ffb347'] // Couleur au survol pour les rendez-vous
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        }
      });
    } else {
      console.error('Le contexte du graphique circulaire est nul.');
    }
  }
  
  
  loadPatientsByMonth(): void {
    this.dashboardService.getPatientsByMonth().subscribe({
      next: (data) => {
        console.log(" Données reçues pour Patients par Mois:", data);
        if (data && data.months && data.patientCounts) {
          this.barChartData.labels = data.months;
          this.barChartData.datasets[0].data = data.patientCounts;
          console.log("Mise à jour des données du graphique :", this.barChartData);
          this.updateChart();
        } else {
          console.error(" Données invalides :", data);
        }
      },
      error: (err) => console.error(" Erreur lors de la récupération des patients par mois :", err)
    });
  }
  
  
  
  
  
  
  
  updateChart() {
    console.log(" Mise à jour du graphique en cours...");
    
    if (this.chart) {
      this.chart.destroy(); // Détruire l'ancien graphique
      console.log(" Ancien graphique détruit.");
    }
  
    if (this.barCanvas && this.barCanvas.nativeElement) {
      const ctx = this.barCanvas.nativeElement.getContext('2d');
      if (ctx) {
        console.log(" Création du nouveau graphique...");
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: this.barChartData,
          options: this.barChartOptions
        });
      } else {
        console.error("Erreur: Impossible d'obtenir le contexte 2D du canvas");
      }
    } else {
      console.error("Erreur: Référence au canvas introuvable");
    }
  }
  
  
  
  
}
