import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Import HttpClient
import { Observable, tap, catchError, of, map } from 'rxjs'; // Import Observable, tap, catchError, of

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  role?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://stagingapiserver.opallius.com/auth/users';

  constructor(private router: Router, private http: HttpClient) { }

  login(username: string, password: string, role: number): Observable<LoginResponse> {
    const payload = {
      email: username,
      password: password,
      role: role
    };

    return this.http.post<any>(`${this.apiUrl}/login/`, payload).pipe(
      map(response => {
        console.log('API raw response:', response);

        if (response.statusCode === 200) {
          localStorage.setItem('loggedIn', 'true');
          return {
            success: true,
            message: response.message || 'Login successful.'
          };
        } else {
          return {
            success: false,
            message: response.message || 'Login failed.'
          };
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login API error:', error);
        let errorMessage = 'An unknown error occurred during API communication.';

        if (error.error && typeof error.error === 'object' && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.status === 0) {
          errorMessage = 'Could not connect to the server.';
        } else if (error.status) {
          errorMessage = `Server responded with status ${error.status}`;
        }

        return of({ success: false, message: errorMessage });
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const loginFlag = localStorage.getItem('loggedIn');
    return loginFlag === 'true';
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  signup(data: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    role: number;
    }): Observable<{ success: boolean; message: string }> {
      return this.http.post<any>(`${this.apiUrl}/signup/`, data).pipe(
        map(response => {
          if (response && response.success) {
            return { success: true, message: response.message || 'Signup successful' };
          } else {
            return { success: false, message: response.message || 'Signup failed' };
          }
        }),
      catchError((error: HttpErrorResponse) => {
        console.error('Signup API error:', error);
        let errorMessage = 'An unknown error occurred during signup.';

        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.status === 0) {
          errorMessage = 'Could not connect to the server.';
        } else if (error.status) {
          errorMessage = `Server error ${error.status}: ${error.statusText}`;
        }

        return of({ success: false, message: errorMessage });
      })
    );
  }

}
