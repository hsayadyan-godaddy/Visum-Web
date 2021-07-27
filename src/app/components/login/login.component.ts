import {
  Input, Component, Output, EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: any = {
    userName: null,
    password: null,
  };

  isLoggedIn = false;

  isLoginFailed = false;

  errorMessage = '';

  constructor(public auth: AuthService, public router: Router) { }

  onSubmit(): void {
    const { userName, password } = this.form;
    const user = new User();
    user.userName = userName;
    user.password = password;
    this.auth.signIn(user);
  }

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}
