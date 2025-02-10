import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { DashboardService } from 'src/app/dashboard.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
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
    this.loadPatientsByMonth();
    this.loadPatients();
    this.loadRendezvous();
    this.loadTraitements();
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  loadPatientsByMonth(): void {
    this.dashboardService.getPatientsByMonth().subscribe({
      next: (data) => {
        if (data && data.months && data.patientCounts) {
          this.barChartData.labels = data.months;
          this.barChartData.datasets[0].data = data.patientCounts;
          this.updateChart();
        } else {
          console.error("Données invalides reçues pour 'Patients par Mois':", data);
        }
      },
      error: (err) => console.error("Erreur lors de la récupération des données des patients par mois :", err)
    });
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
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error("Le canvas 'myChart' n'est pas trouvé !");
      return;
    }

    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: this.barChartData,
        options: this.barChartOptions
      });
    }
  }

  updateChart() {
    if (this.chart) {
      this.chart.data = this.barChartData;
      this.chart.update();
    }
  }
}
