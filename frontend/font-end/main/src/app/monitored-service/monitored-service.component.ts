import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MonitoredService } from '../models/monitored-service.model';
import { MonitoredServiceService } from '../services/monitored-service.service';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-monitored-service',
  templateUrl: './monitored-service.component.html',
  styleUrls: ['./monitored-service.component.scss']
})
export class MonitoredServiceComponent implements OnInit {
  services$: Observable<MonitoredService[]>;
  filterStatus: string = 'ALL';
  isLoading: boolean = false;
  userRole: string = ''; // Add a property for the user role

  constructor(
    private monitoredServiceService: MonitoredServiceService,
    private userService: UserService,
    private notifier: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadServices();
    this.userRole = this.userService.getUserType();
  }

  loadServices(): void {
    this.isLoading = true;
    this.services$ = this.monitoredServiceService.getAllServices();
    this.services$.subscribe(() => this.isLoading = false);
  }

  filterServices(status: string): void {
    this.filterStatus = status;
    if (status === 'ALL') {
      this.loadServices();
    } else {
      this.services$ = this.monitoredServiceService.getServicesByStatus(status);
    }
  }

  saveService(serviceForm: NgForm): void {
    if (serviceForm.valid) {
      const newService: MonitoredService = serviceForm.value;
      this.monitoredServiceService.saveService(newService).subscribe(
        () => {
          this.loadServices();
          this.closeModal();
          serviceForm.resetForm();
        },
        error => {
          console.error('Error saving service', error);
        }
      );
    }
  }

  deleteService(service: MonitoredService): void {
    if (service.id) {
      this.monitoredServiceService.deleteService(service.id).subscribe(() => {
        this.loadServices();
      });
    }
  }

  printReport(): void {
    this.notifier.onSuccess('Report downloaded');
    this.services$.subscribe(services => {
      // Create a new workbook
      const wb = XLSX.utils.book_new();
      // Convert JSON data to worksheet
      const ws = XLSX.utils.json_to_sheet(services);
      // Append worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Services');
      // Generate Excel file
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      // Save file
      saveAs(new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'services_report.xlsx');
    });
  }

  openModal(): void {
    const modal = document.getElementById('addServiceModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  closeModal(): void {
    const modal = document.getElementById('addServiceModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }
}
