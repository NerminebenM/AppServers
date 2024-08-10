import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ServerService } from '../services/server.service';
import { ClusterService } from '../services/cluster.service';
import { ApexChart } from 'ng-apexcharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from '../services/EmployeeService';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminOverviewComponent implements OnInit, OnDestroy {
  @ViewChild('chartsSection') chartsSection: ElementRef;

  private unsubscribe$ = new Subject<void>();
  public salesOverviewChart: Partial<any>;
  public yearlyChart: Partial<any>;
  public monthlyChart: Partial<any>;
  public employeeChart: Partial<any>;
  public clusterChart: Partial<any>;
  public totalServers: number;
  public serversUp: number;
  public serversDown: number;
  public totalEmployees: number;
  public totalClusters: number;
  clusterStatistics: any;
  serverStatistics: any;
  public serverCount: number = 0;
  clusterCount: number;

  constructor(
    private serverService: ServerService,
    private clusterService: ClusterService,
    private employeeService: EmployeeService,
    private notifier: NotificationService
  ) {
    this.initializeCharts();
  }

  ngOnInit(): void {
    this.loadClusterStatistics();
    this.loadServerStatistics();
    this.loadClusterCount();
    this.loadServerCount('SERVER_UP');  // Assure-toi que cette ligne est bien appelée
    this.loadChartData();
    this.loadEmployeeData();
    this.loadClusterData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private initializeCharts() {
    this.salesOverviewChart = {
      series: [],
      chart: {
        type: 'pie',
        height: 350
      },
      labels: ['Servers Up', 'Servers Down'],
      tooltip: { theme: 'dark' },
    };

    this.yearlyChart = {
      series: [],
      chart: {
        type: 'bar',
        height: 350
      },
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      tooltip: { theme: 'dark' },
    };

    this.monthlyChart = {
      series: [],
      chart: {
        type: 'line',
        height: 350
      },
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      tooltip: { theme: 'dark' },
    };

    this.employeeChart = {
      series: [],
      chart: {
        type: 'bar',
        height: 350
      },
      labels: ['Total Employees'],
      tooltip: { theme: 'dark' },
    };

    this.clusterChart = {
      series: [],
      chart: {
        type: 'bar',
        height: 350
      },
      labels: ['Total Clusters'],
      tooltip: { theme: 'dark' },
    };
  }

  private loadChartData() {
    this.serverService.getServerMetrics$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        metrics => {
          this.totalServers = metrics.length;
          this.serversUp = metrics.filter(server => server.status === 'SERVER_UP').length;
          this.serversDown = metrics.filter(server => server.status === 'SERVER_DOWN').length;
          this.updateCharts(metrics);
        },
        error => {
          this.notifier.showError('Error loading chart data');
          console.error('Error loading chart data:', error);
        }
      );
  }

  private loadClusterStatistics(): void {
    this.clusterService.getClusterStatistics().subscribe(
      data => {
        this.clusterStatistics = data;
        console.log(this.clusterStatistics);
      },
      error => {
        console.error('Failed to load cluster statistics', error);
        this.notifier.showError('Error loading cluster statistics');
      }
    );
  }

  private loadServerStatistics() {
    this.serverService.getServerStatistics$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        statistics => {
          this.serverStatistics = statistics;
          console.log('Server Statistics:', this.serverStatistics);  // Ajoute ce log pour voir les données reçues
        },
        error => {
          this.notifier.showError('Error loading server statistics');
          console.error('Error loading server statistics:', error);
        }
      );
  }


  private loadEmployeeData() {
    this.employeeService.getEmployees()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        employees => {
          this.totalEmployees = employees.length;
          this.employeeChart.series = [{
            name: 'Employees',
            data: [this.totalEmployees]
          }];
        },
        error => {
          this.notifier.showError('Error loading employee data');
          console.error('Error loading employee data:', error);
        }
      );
  }

  private loadClusterData() {
    this.clusterService.getAllClusters()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        clusters => {
          this.totalClusters = clusters.length;
          this.clusterChart.series = [{
            name: 'Clusters',
            data: [this.totalClusters]
          }];
        },
        error => {
          this.notifier.showError('Error loading cluster data');
          console.error('Error loading cluster data:', error);
        }
      );
  }

  private updateCharts(metrics: any[]) {
    this.salesOverviewChart.series = [this.serversUp, this.serversDown];

    this.yearlyChart.series = [
      { name: 'CPU Usage', data: metrics.map(m => m.cpuUsage) },
      { name: 'Memory Usage', data: metrics.map(m => m.memoryUsage) }
    ];

    this.monthlyChart.series = [
      { name: 'Network Bandwidth', data: metrics.map(m => m.networkBandwidth) }
    ];
  }

  private loadClusterCount(): void {
    this.clusterService.getAllClusters().subscribe(
      clusters => this.clusterCount = clusters.length,
      error => console.error('Error loading cluster count:', error)
    );
  }

  private loadServerCount(status: string): void {
    if (status) {
      this.serverService.countServersByStatus$(status).subscribe(
        data => {
          this.serverCount = data;
          console.log('Server Count:', this.serverCount);  // Vérifie la valeur reçue
        },
        error => {
          console.error('Error loading server count', error);
        }
      );
    } else {
      console.error('Status is undefined');
    }
  }
}
