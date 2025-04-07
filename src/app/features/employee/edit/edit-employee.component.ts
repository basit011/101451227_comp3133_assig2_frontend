import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employee = {
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    designation: '',
    salary: 0,
    date_of_joining: '',
    department: '',
    employee_photo: '',
  };
  loading = false;
  error = '';

  departments = ['HR', 'IT', 'Finance', 'Marketing', 'Operations'];
  designations = ['Manager', 'Developer', 'Designer', 'Analyst', 'Tester'];
  genders = ['Male', 'Female', 'Other'];

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmployee(id);
    } else {
      this.router.navigate(['/employees']);
    }
  }

  loadEmployee(id: string) {
    this.loading = true;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (result: any) => {
        const employee = result.data?.getEmployeeById;
        if (employee) {
          this.employee = {
            ...employee,
            date_of_joining: new Date(employee.date_of_joining),
          };
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load employee';
        this.loading = false;
      },
    });
  }
 
   onSubmit() {
  this.loading = true;
  this.error = '';

  const updates = {
    first_name: this.employee.first_name,
    last_name: this.employee.last_name,
    email: this.employee.email,
    designation: this.employee.designation,
    salary: this.employee.salary,
    employee_photo: this.employee.employee_photo
  };

  this.employeeService.updateEmployee(this.employee._id, updates).subscribe({
    next: () => {
      this.router.navigate(['/employees', this.employee._id]);
    },
    error: (err) => {
      console.error('Update error:', err);
      this.error = err.message || 'Failed to update employee';
      this.loading = false;
    }
  });
}
}