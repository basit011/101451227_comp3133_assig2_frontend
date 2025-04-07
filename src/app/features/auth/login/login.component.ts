import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // template: `
  //   <div class="login-container">
  //     <mat-card class="login-card">
  //       <mat-card-header>
  //         <mat-card-title>Login</mat-card-title>
  //       </mat-card-header>
  //       <mat-card-content>
  //         <form #loginForm="ngForm" (ngSubmit)="onSubmit()">
  //           <mat-form-field appearance="outline">
  //             <mat-label>Email</mat-label>
  //             <input
  //               matInput
  //               type="email"
  //               name="email"
  //               [(ngModel)]="credentials.email"
  //               required
  //               email
  //               autocomplete="username"
  //             />
  //             <mat-error>Valid email is required</mat-error>
  //           </mat-form-field>

  //           <mat-form-field appearance="outline">
  //             <mat-label>Password</mat-label>
  //             <input
  //               matInput
  //               type="password"
  //               name="password"
  //               [(ngModel)]="credentials.password"
  //               required
  //               minlength="6"
  //               autocomplete="current-password"
  //             />
  //             <mat-error>Password must be at least 6 characters</mat-error>
  //           </mat-form-field>

  //           <button
  //             mat-raised-button
  //             color="primary"
  //             type="submit"
  //             [disabled]="loading"
  //           >
  //             {{ loading ? 'Logging in...' : 'Login' }}
  //           </button>
  //         </form>
  //       </mat-card-content>
  //       <mat-card-actions>
  //         <a mat-button routerLink="/signup">Create an account</a>
  //       </mat-card-actions>
  //     </mat-card>
  //   </div>
  // `,
  // styles: [
  //   `
  //     .login-container {
  //       display: flex;
  //       justify-content: center;
  //       align-items: center;
  //       height: 100vh;
  //       background-color: #f5f5f5;
  //     }
  //     .login-card {
  //       width: 400px;
  //       padding: 20px;
  //     }
  //     mat-form-field {
  //       width: 100%;
  //       margin-bottom: 16px;
  //     }
  //     button[type='submit'] {
  //       width: 100%;
  //     }
  //   `,
  // ],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.error = '';

    this.authService.login(this.credentials).subscribe({
      next: (result: any) => {
        const token = result.data?.login?.token;
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/employees']);
        } else {
          this.error = 'Invalid credentials';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Login failed';
        this.loading = false;
      },
    });
  }
}
