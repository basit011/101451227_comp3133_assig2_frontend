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
  selector: 'app-signup',
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
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],

  // template: `
  //   <div class="signup-container">
  //     <mat-card class="signup-card">
  //       <mat-card-header>
  //         <mat-card-title>Sign Up</mat-card-title>
  //       </mat-card-header>
  //       <mat-card-content>
  //         <form #signupForm="ngForm" (ngSubmit)="onSubmit()">
  //           <mat-form-field appearance="outline">
  //             <mat-label>Username</mat-label>
  //             <input
  //               matInput
  //               name="username"
  //               [(ngModel)]="credentials.username"
  //               required
  //               minlength="3"
  //               autocomplete="username"
  //             />
  //             <mat-error>Username must be at least 3 characters</mat-error>
  //           </mat-form-field>

  //           <mat-form-field appearance="outline">
  //             <mat-label>Email</mat-label>
  //             <input
  //               matInput
  //               type="email"
  //               name="email"
  //               [(ngModel)]="credentials.email"
  //               required
  //               email
  //               autocomplete="email"
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
  //               autocomplete="new-password"
  //             />
  //             <mat-error>Password must be at least 6 characters</mat-error>
  //           </mat-form-field>

  //           <button
  //             mat-raised-button
  //             color="primary"
  //             type="submit"
  //             [disabled]="loading"
  //           >
  //             {{ loading ? 'Creating account...' : 'Sign Up' }}
  //           </button>
  //         </form>
  //         <div class="error" *ngIf="error">{{ error }}</div>
  //       </mat-card-content>
  //       <mat-card-actions>
  //         <a mat-button routerLink="/login">Already have an account? Login</a>
  //       </mat-card-actions>
  //     </mat-card>
  //   </div>
  // `,
  // styles: [
  //   `
  //     .signup-container {
  //       display: flex;
  //       justify-content: center;
  //       align-items: center;
  //       height: 100vh;
  //       background-color: #f5f5f5;
  //     }
  //     .signup-card {
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
  //     .error {
  //       color: #f44336;
  //       margin-top: 16px;
  //     }
  //   `,
  // ],
})
export class SignupComponent {
  credentials = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '', 
  };
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.error = '';

    this.authService
      .signup(
        this.credentials.username,
        this.credentials.email,
        this.credentials.password
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/login'], {
            queryParams: { registered: true },
          });
        },
        error: (err) => {
          this.error = err.message || 'Registration failed';
          this.loading = false;
        },
      });
  }
}
