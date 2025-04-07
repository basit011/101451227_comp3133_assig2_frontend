import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/auth/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./features/employee/list/employee-list.component').then(
        (m) => m.EmployeeListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'employees/add',
    loadComponent: () =>
      import('./features/employee/add/add-employee.component').then(
        (m) => m.AddEmployeeComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: 'employees/view',
    loadComponent: () =>
      import('./features/employee/view/view-employee.component').then(
        (m) => m.ViewEmployeeComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'employees/edit',
    loadComponent: () =>
      import('./features/employee/edit/edit-employee.component').then(
        (m) => m.EditEmployeeComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'employees',
  },
];
  
