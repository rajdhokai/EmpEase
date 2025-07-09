import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_KEY = 'currentUser';

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  signup(user: any): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some((u: any) => u.email === user.email)) {
      return false;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem(this.USER_KEY) || '{}');
  }
}
