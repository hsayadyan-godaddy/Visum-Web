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
 

  isActive: string;

  @Output() sideNav = new EventEmitter<boolean>();


  ngOnInit(): void {
  }

}
