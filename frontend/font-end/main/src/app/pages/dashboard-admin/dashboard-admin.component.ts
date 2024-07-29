import { Component, ViewEncapsulation, ViewChild, OnInit, ElementRef } from '@angular/core';
import { ApexChart, ChartComponent } from 'ng-apexcharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { RecentActivity } from 'src/app/models/RecentActivity';
import { ServerHistory } from 'src/app/models/server-history';
import { ServerService } from 'src/app/services/server.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardadminComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  @ViewChild('chartsSection') chartsSection: ElementRef;

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

  displayedColumns: string[] = ['name', 'status'];
  dataSource = [
    { name: 'server 1', status: 'In Progress' },
    { name: 'server B', status: 'Completed' },
    { name: 'server C', status: 'Not Started' }
  ];

  constructor(private serverService: ServerService, private notifier: NotificationService) {
    this.initializeCharts();
  }

  ngOnInit(): void {
    this.loadChartData();
    this.loadServerStatistics();
    this.loadRecentActivities();
  }

  loadChartData() {
    this.serverService.getServerMetrics$().subscribe(metrics => {
      console.log('Server metrics:', metrics);
      this.totalServers = metrics.length;
      this.serversUp = metrics.filter(server => server.status === 'SERVER_UP').length;
      this.serversDown = metrics.filter(server => server.status === 'SERVER_DOWN').length;
      this.updateCharts(metrics);
    });
  }

  loadServerStatistics() {
    this.serverService.getServerStatistics$().subscribe(statistics => {
      console.log('Server statistics:', statistics);
      this.serverStatistics = {
        averageCpuUsage: statistics.averageCpuUsage.toFixed(2),
        totalServers: statistics.totalServers,
        totalNetworkBandwidth: statistics.totalNetworkBandwidth,
        averageMemoryUsage: statistics.averageMemoryUsage.toFixed(2)
      };

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
      this.filteredActivities = activities;
    }, error => {
      console.error('Error loading recent activities:', error);
    });
  }

  initializeCharts() {
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
  }

  updateCharts(metrics: any[]) {
    this.salesOverviewChart.series = [this.serversUp, this.serversDown];

    this.yearlyChart.series = [
      { name: 'CPU Usage', data: metrics.map(m => m.cpuUsage) },
      { name: 'Memory Usage', data: metrics.map(m => m.memoryUsage) }
    ];

    this.monthlyChart.series = [
      { name: 'Network Bandwidth', data: metrics.map(m => m.networkBandwidth) }
    ];

    if (this.chart) {
      this.chart.updateSeries(this.salesOverviewChart.series);
      this.chart.updateSeries(this.yearlyChart.series);
      this.chart.updateSeries(this.monthlyChart.series);
    }
  }

 

  printPDF(): void {
    const chartsSection = this.chartsSection.nativeElement;
    html2canvas(chartsSection).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('charts-report.pdf');
    });
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
    console.log('Filtering by date:', selectedDate);
    if (!selectedDate) {
      this.filteredActivities = this.recentActivities;
    } else {
      this.filteredActivities = this.recentActivities.filter(activity => {
        if (activity.timestamp instanceof Date) {
          return activity.timestamp.toDateString() === selectedDate.toDateString();
        }
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
