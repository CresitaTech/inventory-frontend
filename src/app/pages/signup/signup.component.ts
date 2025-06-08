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
    email: '',
    password: '',
    confirm_password: ''
  };

  errorMessage: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  onSignup() {
    if (this.signupData.password !== this.signupData.confirm_password) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.auth.signup(this.signupData).subscribe(result => {
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
