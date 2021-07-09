import { Component, OnInit,ChangeDetectorRef,OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Observable, of } from 'rxjs';
import {MediaMatcher} from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public positionOptions: TooltipPosition[] = ['left']; // Tooltip postion
  // tslint:disable-next-line:typedef
  public position = new FormControl(this.positionOptions[0]); 
  userDisplayName = '';
  isLoggedin:boolean=false;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  
  constructor(private authService: AuthService) {
    this.authService.isUserLoggedIn.subscribe( value => {
      this.isLoggedin = value;
  });
  }
    
  ngOnInit() {
   
   this.isLoggedin = this.authService.isLoggedIn;
   this.userDisplayName = localStorage.getItem('user_name');
  }

  onLogout() {
    this.authService.logout();
    this.isLoggedin = false;
  }

}
