import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    role: null as number | null
  };

  errorMessage: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  onSignup() {
    if (!this.signupData.role) {
      this.errorMessage = 'Please select a role';
      return;
    }

    const signupPayload = {
      ...this.signupData,
      role: this.signupData.role as number
    };

    this.auth.signup(signupPayload).subscribe(result => {
      if (result.success) {
        console.log('Signup successful');
        this.router.navigate(['/login'], {
          queryParams: { signupSuccess: '1' }
        });
      } else {
        this.errorMessage = result.message;
      }
    });
  }

}
