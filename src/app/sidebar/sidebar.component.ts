// core imports
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(public router: Router) {
    this.isActive = router.url.includes('well') ? 'well' : router.url.includes('project') ? 'project' :
     router.url.includes('home') ? 'home' : 'home';
  }
  isMenuOpen = true;
  contentMargin = 240;

  isActive: string;

  @Output() sideNav = new EventEmitter<boolean>();

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 50;
    } else {
      this.contentMargin = 240;
    }
  }

  ngOnInit(): void {
  }

}
