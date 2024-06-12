import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../services/employee-model';
import { EmployeeService } from '../services/EmployeeService';

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog-component.component.html',
 // styleUrls: ['./edit-employee-dialog-component.component.css']
})
export class EditEmployeeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private employeeService: EmployeeService // Injectez EmployeeService
  ) {}

  onConfirm(): void {
    // Envoyer la demande de mise à jour à l'API
    this.employeeService.editEmployee(this.data.matricule, this.data).subscribe(() => {
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
