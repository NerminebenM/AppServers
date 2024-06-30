import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../services/employee-model';
import { EmployeeService } from '../services/EmployeeService';

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog-component.component.html',
  styleUrls: ['./edit-employee-dialog-component.component.scss']
})
export class EditEmployeeDialogComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      username: [this.data.username, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onConfirm(): void {
    if (this.employeeForm.valid) {
      this.employeeService.editEmployee(this.data.username, this.employeeForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
