import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  employeeForm = this.fb.group(
    {
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      avatar: [''],
    },
    { validators: this.passwordMatchValidator }
  );

  id = this.route.snapshot.paramMap.get('id');
  isEditMode = !!this.id;
  avatarPreview: string | undefined;

  ngOnInit(): void {
    if (this.isEditMode && this.id) {
      const employee = this.employeeService.getEmployee(this.id);
      if (employee) {
        this.employeeForm.patchValue({
          fullName: employee.fullName,
          email: employee.email,
          avatar: employee.avatar || '',
        });
        this.avatarPreview = employee.avatar;
        this.employeeForm.get('password')?.clearValidators();
        this.employeeForm.get('confirmPassword')?.clearValidators();
        this.employeeForm.updateValueAndValidity();
      }
    }
  }

  passwordMatchValidator(form: any) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const { fullName, email, password, avatar } = this.employeeForm.value;
      const employeeData = {
        fullName: fullName!,
        email: email!,
        password: password!,
        avatar: this.avatarPreview || avatar || undefined,
      };

      if (this.isEditMode && this.id) {
        this.employeeService.updateEmployee(this.id, employeeData);
      } else {
        this.employeeService.addEmployee(employeeData);
      }

      this.router.navigate(['/employees']);
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
