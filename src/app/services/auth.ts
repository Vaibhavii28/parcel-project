import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

// User roles as allowed by backend
export type UserRole = 'customer' | 'admin';

// UserProfile should match your backend entity except for the password
export interface UserProfile {
  userId: string;
  fullName: string;
  address: string;
  email: string;
  username: string;
  mobileNumber: string;
  // NEVER store plain password in frontend; skip if returned by backend
  role: UserRole;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: UserProfile | null = null;
  private apiUrl = '/api/userprofile/login';

  constructor(private router: Router, private http: HttpClient) {}

  /**
   * Attempt to login with email and password by calling backend 
   * Stores user profile on success, returns Observable<boolean>
   */
  login(email: string, password: string): Observable<boolean> {
    const payload = { email, password };
    return this.http.post<UserProfile>(this.apiUrl, payload).pipe(
      tap(response => {
        if (response && response.userId) {
          this.currentUser = response;
          localStorage.setItem('user', JSON.stringify(response));
        }
      }),
      map(response => !!response && !!response.userId),
      catchError(() => of(false))
    );
  }

  /** Log out user, clear storage, and navigate to login */
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  /** Get current user, loading from localStorage if needed */
  getUser(): UserProfile | null {
    if (!this.currentUser) {
      const stored = localStorage.getItem('user');
      if (stored) {
        this.currentUser = JSON.parse(stored) as UserProfile;
      }
    }
    return this.currentUser;
  }

  /** Check if a user is logged in */
  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  /** Check for a specific role */
  hasRole(role: UserRole): boolean {
    return this.getUser()?.role === role;
  }
}
