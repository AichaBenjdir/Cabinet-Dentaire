import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { DashboardService } from 'src/app/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56],
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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getPatients().subscribe((patients) => {
      this.totalPatients = patients.length;
    });

    this.dashboardService.getRendezvous().subscribe((rendezvous) => {
      this.totalRdvToday = rendezvous.length;
    });

    this.dashboardService.getTraitements().subscribe((traitements) => {
      this.totalTraitements = traitements.length;
    });
  }
}
