import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = of(this.authService.isLoggedIn);
  }

  onLogout() {
    this.authService.logout();
  }

}
