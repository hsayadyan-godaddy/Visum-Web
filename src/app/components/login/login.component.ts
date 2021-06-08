import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { User } from '../../models/user';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit 
{
  form: any = {
    userName: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(public auth : AuthService, public router : Router){}



   ngOnInit() {}
  //   if (this.tokenStorage.getToken()) {
  //     this.isLoggedIn = true;
  //     this.roles = this.tokenStorage.getUser().roles;
  //   }
  // }

  
  onSubmit(): void {
    const { userName, password } = this.form;
let user = new User();
user.userName= userName;
user.password = password;
    this.auth.signIn(user);
  }


  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}

