import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../core/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    DatePipe,
  ],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css'],
})
export class ViewEmployeeComponent implements OnInit {
  employee: any = null;
  loading = false;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.employeeService.getEmployeeById(id).subscribe({
        next: (result: any) => {
          this.employee = result.data?.getEmployeeById || null;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading employee:', err);
          this.loading = false;
          this.router.navigate(['/employees']);
        },
      });
    } else {
      this.router.navigate(['/employees']);
    }
  }

  editEmployee() {
    this.router.navigate(['/employees/edit', this.employee._id]);
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}
