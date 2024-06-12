import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeDialogComponent } from 'src/app/edit-employee-dialog-component/edit-employee-dialog-component.component';
import { EmployeeService } from 'src/app/services/EmployeeService';
import { Employee } from 'src/app/services/employee-model';

@Component({
  selector: 'app-badge',
  templateUrl: './menu.component.html'
})
export class AppMenuEComponent implements OnInit {

  displayedColumns: string[] = [ 'nom', 'prenom', 'matricule', 'localisation', 'departement', 'poste','actions']; // Mettez les noms de colonnes selon votre interface Employee
  dataSource: Employee[] = []; // Définir le type de dataSource comme Employee[]
  searchQuery: string = ''; // propriété pour stocker la valeur de recherche

  constructor(private employeeService: EmployeeService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe((employees: Employee[]) => { // Assurez-vous de spécifier le type des employés récupérés
        this.dataSource = employees;
      });
  }

  search(): void {
    this.employeeService.searchEmployees(this.searchQuery)
      .subscribe((employees: Employee[]) => {
        this.dataSource = employees;
      });
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.uploadFile(file);
  }


  uploadFile(file: File): void {
    this.employeeService.uploadCsvFile(file)
      .subscribe(
        response => {
          console.log('File uploaded successfully');
          // Rafraîchir la liste des employés après le téléchargement du fichier
          this.getEmployees();
        },
        error => {
          console.error('Error uploading file:', error);
          // Gérer les erreurs en conséquence
        }
      );
  }

  // Ouvrir la boîte de dialogue d'édition
  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      width: '400px', // Définir la largeur de la boîte de dialogue
      data: employee // Passer les données de l'employé à la boîte de dialogue
    });

    dialogRef.afterClosed().subscribe(result => {
      // Rafraîchir la liste des employés après l'édition (si nécessaire)
      if (result) {
        this.getEmployees();
      }
    });
    
  }
  deleteEmployee(employee: Employee): void {
    // Logique pour confirmer la suppression de l'employé
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employee.matricule).subscribe(
        response => {
          console.log('Employee deleted successfully');
          // Rafraîchir la liste des employés après la suppression
          this.getEmployees();
        },
        error => {
          console.error('Error deleting employee:', error);
          // Gérer les erreurs en conséquence
        }
      );
    }
  }
}
