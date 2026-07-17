import {Injectable, signal} from '@angular/core';
import {AdminUser} from '../models/user.model';

// TEMPORARY mock auth. When the real API is ready, replace login() with an
// HttpClient POST to /api/auth/login and store the returned JWT instead of
// a fake token, keeping isAuthenticated()/currentUser() as the public API.
const MOCK_ADMIN = {email: 'admin@fehna.hn', password: 'fehna2026'};
const STORAGE_KEY = 'fehna_admin_session';

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly _currentUser = signal<AdminUser | null>(this.restoreSession());
  readonly currentUser = this._currentUser.asReadonly();

  isAuthenticated(): boolean {
    return this._currentUser() !== null;
  }

  login(email: string, password: string): boolean {
    if (email.toLowerCase() === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
      const user: AdminUser = {id: 1, email, name: 'Administrador FEHNA', role: 'admin'};
      this._currentUser.set(user);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this._currentUser.set(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  private restoreSession(): AdminUser | null {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
