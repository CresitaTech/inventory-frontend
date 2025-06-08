import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  selectedRole: number | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['signupSuccess'] === '1') {
        this.successMessage = 'Signup successful. Please await administrator approval for login activation.';
      }
    });
  }

  onLogin() {
    this.errorMessage = null;

    if (this.selectedRole === null || this.selectedRole === 0) {
      this.errorMessage = 'Please select a department.';
      return;
    }

    this.auth.login(this.username, this.password, this.selectedRole).subscribe({
      next: (response) => {
        console.log('Login API response:', response);

        if (response && response.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = response.message || 'Login failed. Please try again.';
        }
      },
      error: (err) => {
        console.error('An unexpected error occurred during login subscription:', err);
        this.errorMessage = 'An unexpected error occurred. Please try again.';
      }
    });
  }

}
