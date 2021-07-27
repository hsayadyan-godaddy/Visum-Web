// core imports
import {
  Component, Output, EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(public router: Router) {
    if (router.url.includes('well')) { this.isActive = 'well'; } else if (router.url.includes('project')) {
      this.isActive = 'project';
    } else if (router.url.includes('home')) {
      this.isActive = 'home';
    } else this.isActive = 'home';
  }

  isMenuOpen = true;

  isActive: string;

  @Output() sideNav = new EventEmitter<boolean>();
}
