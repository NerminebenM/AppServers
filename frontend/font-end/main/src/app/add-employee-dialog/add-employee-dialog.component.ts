import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/EmployeeService';
import { Employee } from 'src/app/services/employee-model';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss']
})
export class AddEmployeeDialogComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSave(): void {
    if (this.employeeForm.valid) {
      const formValues = this.employeeForm.value;
      const username = formValues.username;
      const email = formValues.email;
      const password = formValues.password;

      this.employeeService.addEmployeeWithUser(null, username, email, password).subscribe(
        response => {
          this.showSuccess('Employee and user added successfully');
          this.dialogRef.close(true);
        },
        error => this.showError('Error adding employee and user')
      );
    } else {
      this.showError('Please fill all required fields');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
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
