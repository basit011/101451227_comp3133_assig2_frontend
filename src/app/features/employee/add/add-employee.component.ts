import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-employee',
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
  ],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent { 
  employee = {
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
    private router: Router
  ) {}

  onSubmit() {
    this.loading = true;
    this.error = '';

    const employeeData = {
      ...this.employee,
      date_of_joining: new Date(this.employee.date_of_joining).toISOString(),
    };

    this.employeeService.addEmployee(employeeData).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.error = err.message || 'Failed to add employee';
        this.loading = false;
      },
    });
  }
}



// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { EmployeeService } from '../../../core/services/employee.service';
// import { Router } from '@angular/router';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatSelectModule } from '@angular/material/select';
// import { MatIconModule } from '@angular/material/icon';
// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';
// import { MatLabel } from '@angular/material/form-field';

// @Component({
//   selector: 'app-add-employee',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatDatepickerModule,
//     MatNativeDateModule,
//     MatSelectModule,
//     MatIconModule,
//   ],
//   templateUrl: './add-employee.component.html',
//   styleUrls: ['./add-employee.component.css'],
// })
// export class AddEmployeeComponent {
//   employee = {
//     first_name: '',
//     last_name: '',
//     email: '',
//     gender: '',
//     designation: '',
//     salary: 0,
//     date_of_joining: '',
//     department: '',
//     employee_photo: '',
//   };
//   loading = false;
//   error = '';

//   departments = ['HR', 'IT', 'Finance', 'Marketing', 'Operations'];
//   designations = ['Manager', 'Developer', 'Designer', 'Analyst', 'Tester'];
//   genders = ['Male', 'Female', 'Other'];

//   constructor(
//     private employeeService: EmployeeService,
//     private router: Router
//   ) {}

// // Update your onSubmit method:
// async onSubmit() {
//   try {
//     this.loading = true;
//     this.error = '';

//     const employeeData = {
//       ...this.employee,
//       date_of_joining: new Date(this.employee.date_of_joining).toISOString(),
//     };

//     const result = await this.employeeService.addEmployee(employeeData)
//       .pipe(
//         catchError(error => {
//           if (error.networkError?.statusCode === 401) {
//             // Clear invalid token and redirect to login
//             localStorage.removeItem('token');
//             this.router.navigate(['/login']);
//             return throwError(() => new Error('Session expired. Please login again.'));
//           }
//           return throwError(() => error);
//         })
//       )
//       .toPromise();

//     this.router.navigate(['/employees']);
//   } catch (err) {
//     this.error = err.message || 'Failed to add employee';
//     console.error('Add employee error:', err);
//   } finally {
//     this.loading = false;
//   }
// }
// }

