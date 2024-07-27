import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ApexChart, ChartComponent } from 'ng-apexcharts';
import { RecentActivity } from 'src/app/models/RecentActivity';
import { ServerHistory } from 'src/app/models/server-history';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardadminComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;

  public salesOverviewChart: Partial<any>;
  public yearlyChart: Partial<any>;
  public monthlyChart: Partial<any>;
  public showFilter: boolean = false;
  public totalServers: number;
  public serversUp: number;
  public serversDown: number;
  public serverHistory: ServerHistory[] = [];
  public serverStatistics: any = {};
  public recentActivities: RecentActivity[] = [];
  public filteredActivities: RecentActivity[] = [];

  displayedColumns: string[] = ['name','status'];
  dataSource = [
    { name: 'server 1',  status: 'In Progress' },
    { name: 'server B',  status: 'Completed' },
    { name: 'server C', status: 'Not Started' }
  ];

  constructor(private serverService: ServerService) {
    this.initializeCharts();
  }

  ngOnInit(): void {
    this.loadChartData();
//    this.loadServerHistory(1); // Load history for server with ID 1
    this.loadServerStatistics();
    this.loadRecentActivities(); // Load recent activities
  }

  loadChartData() {
    this.serverService.getServerMetrics$().subscribe(metrics => {
      console.log('Server metrics:', metrics);
      this.totalServers = metrics.length;
      this.serversUp = metrics.filter(server => server.status === 'SERVER_UP').length;
      this.serversDown = metrics.filter(server => server.status === 'SERVER_DOWN').length;
      this.updateCharts(metrics); // Passer les nouvelles données aux graphiques
    });
  }

 /* loadServerHistory(serverId: number) {
    this.serverService.getServerHistory$(serverId).subscribe(history => {
      console.log('Server history:', history);
      this.serverHistory = history;
    }, error => {
      console.error('Error loading server history:', error);
    });
  }
*/
  loadServerStatistics() {
    this.serverService.getServerStatistics$().subscribe(statistics => {
      console.log('Server statistics:', statistics);
      this.serverStatistics = {
        averageCpuUsage: statistics.averageCpuUsage.toFixed(2),
        totalServers: statistics.totalServers,
        totalNetworkBandwidth: statistics.totalNetworkBandwidth,
        averageMemoryUsage: statistics.averageMemoryUsage.toFixed(2)
      };

      // Mettre à jour les données des graphiques
      this.updateCharts(statistics);
    }, error => {
      console.error('Error loading server statistics:', error);
    });
  }

  loadRecentActivities() {
    console.log('Loading recent activities...');
    this.serverService.getRecentActivities$().subscribe(activities => {
      console.log('Recent activities:', activities);
      this.recentActivities = activities;
      this.filteredActivities = activities; // Initialiser les activités filtrées avec toutes les activités
    }, error => {
      console.error('Error loading recent activities:', error);
    });
  }

  initializeCharts() {
    // Initialiser les graphiques avec des données vides
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

    // Initialiser les autres graphiques de la même manière
  }

  updateCharts(metrics: any[]) {
    // Mettre à jour les données des graphiques avec les métriques récupérées
    this.salesOverviewChart.series = [this.serversUp, this.serversDown];

    // Mettre à jour les autres graphiques de la même manière

    // Mettre à jour le graphique
    this.yearlyChart.series = [
      { name: 'CPU Usage', data: metrics.map(m => m.cpuUsage) },
      { name: 'Memory Usage', data: metrics.map(m => m.memoryUsage) }
    ];

    this.monthlyChart.series = [
      { name: 'Network Bandwidth', data: metrics.map(m => m.networkBandwidth) }
    ];

    // Mettre à jour le graphique
    if (this.chart) {
      this.chart.updateSeries(this.salesOverviewChart.series);
      // Mettre à jour les autres graphiques
      this.chart.updateSeries(this.yearlyChart.series);
      this.chart.updateSeries(this.monthlyChart.series);
    }
  }

  formatDate(timestamp: Date): string {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return date.toLocaleDateString('en-US', options);
  }
  filterByDate(selectedDate: Date) {
    console.log('Filtering by date:', selectedDate); // Ajoutez un log ici
    if (!selectedDate) {
      // Si aucune date n'est sélectionnée, affichez toutes les activités
      this.filteredActivities = this.recentActivities;
    } else {
      // Sinon, filtrez les activités par la date sélectionnée
      this.filteredActivities = this.recentActivities.filter(activity => {
        // Vérifiez si activity.timestamp est une instance de Date
        if (activity.timestamp instanceof Date) {
          // Comparaison de la date (ignorant l'heure)
          return activity.timestamp.toDateString() === selectedDate.toDateString();
        }
        // Si ce n'est pas une instance de Date, vous pouvez choisir de gérer cela différemment
        return false;
      });
    }
    console.log('Filtered activities:', this.filteredActivities);
  }


  toggleFilter() {
    this.showFilter = !this.showFilter;
    console.log('Toggled filter visibility:', this.showFilter);
  }

  sendAlertEmail() {
    /* this.serverService.sendAlertEmail$(this.alertSubject, this.alertBody).subscribe(response => {
      console.log('Alert email sent:', response);
    }, error => {
      console.error('Error sending alert email:', error);
    }); */
  }
}
