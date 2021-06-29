import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'ProductWeb';

  status: boolean = false;
  isMenuOpen = true;
  contentMargin = 60;

  onToolbarMenuToggle() {
    this.status = !this.status;
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 60;
    } else {
      this.contentMargin = 60;
    }
  }

}
