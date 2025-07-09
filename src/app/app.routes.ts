import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'employees/add',
    component: EmployeeFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'employees/edit/:id',
    component: EmployeeFormComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: '**', redirectTo: '/employees' },
];
