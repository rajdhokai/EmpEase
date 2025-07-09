import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly EMPLOYEES_KEY = 'employees';

  getEmployees(): Employee[] {
    return JSON.parse(localStorage.getItem(this.EMPLOYEES_KEY) || '[]');
  }

  getEmployee(id: string): Employee | undefined {
    return this.getEmployees().find((emp) => emp.id === id);
  }

  addEmployee(employee: Omit<Employee, 'id'>): void {
    const employees = this.getEmployees();
    const newEmployee = { ...employee, id: this.generateId() };
    employees.push(newEmployee);
    localStorage.setItem(this.EMPLOYEES_KEY, JSON.stringify(employees));
  }

  updateEmployee(id: string, employee: Omit<Employee, 'id'>): void {
    const employees = this.getEmployees();
    const index = employees.findIndex((emp) => emp.id === id);
    if (index !== -1) {
      employees[index] = { ...employee, id };
      localStorage.setItem(this.EMPLOYEES_KEY, JSON.stringify(employees));
    }
  }

  deleteEmployee(id: string): void {
    const employees = this.getEmployees().filter((emp) => emp.id !== id);
    localStorage.setItem(this.EMPLOYEES_KEY, JSON.stringify(employees));
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
