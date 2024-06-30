import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditEmployeeDialogComponent } from 'src/app/edit-employee-dialog-component/edit-employee-dialog-component.component';
import { AddEmployeeDialogComponent } from 'src/app/add-employee-dialog/add-employee-dialog.component';
import { EmployeeService } from 'src/app/services/EmployeeService';
import { Employee } from 'src/app/services/employee-model';

@Component({
  selector: 'app-badge',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class AppMenuEComponent implements OnInit {
  displayedColumns: string[] = ['username', 'email', 'password', 'role', 'status', 'actions'];
  dataSource: Employee[] = [];
  searchQuery: string = '';

  constructor(private employeeService: EmployeeService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (employees: Employee[]) => {
        this.dataSource = employees;
      },
      error => this.showError('Failed to load employees')
    );
  }

  search(): void {
    this.employeeService.searchEmployees(this.searchQuery).subscribe(
      (employees: Employee[]) => {
        this.dataSource = employees;
      },
      error => this.showError('Failed to search employees')
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  uploadFile(file: File): void {
    this.employeeService.uploadCsvFile(file).subscribe(
      response => {
        this.showSuccess('File uploaded successfully');
        this.getEmployees();
      },
      error => this.showError('Error uploading file')
    );
  }

  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      width: '400px',
      data: employee
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees();
      }
    });
  }

  deleteEmployee(employee: Employee): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employee.username).subscribe(
        response => {
          this.showSuccess('Employee deleted successfully');
          this.getEmployees();
        },
        error => this.showError('Error deleting employee')
      );
    }
  }


  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees();
      }
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-error']
    });
  }
}
