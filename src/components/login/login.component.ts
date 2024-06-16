import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private readonly authService: AuthService) {}

  handleGoogleLogin() {
    const res = this.authService.signInWithGoogle();
    console.log(res);

  }

  handleEmailLogin() {
    this.authService.signInWithGoogle();
  }
}
