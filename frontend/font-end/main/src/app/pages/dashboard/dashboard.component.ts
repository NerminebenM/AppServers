import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
} from 'ng-apexcharts';
import { ServerService } from 'src/app/services/server.service';

interface month {
  value: string;
  viewValue: string;
}

export interface salesOverviewChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

export interface yearlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

export interface monthlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

interface stats {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  productName: string;
  budget: number;
  priority: string;
}

// ecommerce card
interface productcards {
  id: number;
  imgSrc: string;
  title: string;
  price: string;
  rprice: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent {
  @ViewChild('chart') chart: ChartComponent;

  public salesOverviewChart: Partial<any>;
  public yearlyChart: Partial<any>;
  public monthlyChart: Partial<any>;

  public totalServers: number;
  public serversUp: number;
  public serversDown: number;

  displayedColumns: string[] = ['name', 'budget', 'status'];
  dataSource = [
    { name: 'Project A', budget: 50000, status: 'In Progress' },
    { name: 'Project B', budget: 75000, status: 'Completed' },
    { name: 'Project C', budget: 100000, status: 'Not Started' }
  ];

  recentActivities = [
    { time: '10:00 AM', activity: 'User A logged in' },
    { time: '11:00 AM', activity: 'User B updated settings' },
    { time: '12:00 PM', activity: 'User C created a new project' }
  ];

  constructor(private serverService: ServerService) {
    this.initializeCharts();
  }

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData() {
    this.serverService.getServerMetrics$().subscribe(metrics => {
      console.log('Server metrics:', metrics);
      this.totalServers = metrics.length;
      this.serversUp = metrics.filter(server => server.status === 'SERVER_UP').length;
      this.serversDown = metrics.filter(server => server.status === 'SERVER_DOWN').length;
      this.updateCharts();
    });
  }

  initializeCharts() {
    // Initialiser les graphiques avec des données vides
    this.salesOverviewChart = {
      series: [],
      chart: {
        type: 'line',
        height: 350
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' },
      xaxis: {
        categories: []
      },
      tooltip: { theme: 'dark' },
    };

    // Initialiser les autres graphiques de la même manière
  }

  updateCharts() {
    // Mettre à jour les données des graphiques avec les métriques récupérées
    this.salesOverviewChart.series = [
      { name: 'Servers Up', data: [this.serversUp], color: '#5D87FF' },
      { name: 'Servers Down', data: [this.serversDown], color: '#FF4560' }
    ];

    // Mettre à jour les autres graphiques de la même manière

    // Mettre à jour le graphique
    if (this.chart) {
      this.chart.updateSeries(this.salesOverviewChart.series);
      // Mettre à jour les autres graphiques
    }
  }
  sendAlertEmail() {
  /*  this.serverService.sendAlertEmail$(this.alertSubject, this.alertBody).subscribe(response => {
      console.log('Alert email sent:', response);
    }, error => {
      console.error('Error sending alert email:', error);
    });*/
  }
}
