import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { ChartData, ChartOptions } from 'chart.js';
import { CustomResponse } from '../pages/server/custom-response';

@Component({
  selector: 'app-instance-status',
  templateUrl: './instance-status.component.html',
  styleUrls: ['./instance-status.component.scss']
})
export class InstanceStatusComponent implements OnInit {
  instances: any[] = [];
  globalStats: any = {};

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Global Stats', backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)', fill: true }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom'
      }
    }
  };
  public lineChartType: 'line' = 'line';

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.loadInstances();
    this.loadGlobalStats();
  }

  loadInstances(): void {
    this.serverService.servers$.subscribe(
      (response: CustomResponse) => {
        this.instances = response.data.servers;
      },
      (error) => {
        console.error('Error fetching instances', error);
      }
    );
  }

  loadGlobalStats(): void {
    this.serverService.getServerStatistics$().subscribe(
      (data) => {
        this.globalStats = data;

        // Convertir les données globalStats pour le graphique
        this.lineChartData.labels = Object.keys(this.globalStats);
        this.lineChartData.datasets[0].data = Object.values(this.globalStats);
      },
      (error) => {
        console.error('Error fetching global statistics', error);
      }
    );
  }
}
