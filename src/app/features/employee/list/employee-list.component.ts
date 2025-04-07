import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../core/services/employee.service';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    MatIcon
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'designation',
    'department',
    'actions',
  ];
  dataSource: any[] = [];
  filteredData: any[] = [];
  searchTerm = '';
  filterBy = 'all';
  currentUserEmail = '';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUserEmail = this.authService.getCurrentUserEmail() || '';
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (result: any) => {
        this.dataSource = result.data?.getAllEmployees || [];
        this.filteredData = [...this.dataSource];
      },
      error: (err) => {
        console.error('Error loading employees:', err);
      },
    });
  }

  applyFilter() {
    this.filteredData = this.dataSource.filter((employee) => {
      const matchesSearch =
        employee.first_name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        employee.last_name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employee.designation
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        employee.department
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());

      if (this.filterBy === 'all') return matchesSearch;
      if (this.filterBy === 'designation')
        return employee.designation
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      if (this.filterBy === 'department')
        return employee.department
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());

      return matchesSearch;
    });
  }

  viewEmployee(id: string) {
    this.router.navigate(['/employees', id]);
  }

  editEmployee(id: string) {
    this.router.navigate(['/employees/edit', id]);
  }

  deleteEmployee(id: string) {
    this.router.navigate(['/employees/delete', id]);
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees();
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
        },
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}



