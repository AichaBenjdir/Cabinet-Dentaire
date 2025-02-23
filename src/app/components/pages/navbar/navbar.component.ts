import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
isNavbar: boolean = false;
isFooter: boolean = false;

isCollapsed: boolean = true;

  // Fonction pour inverser l'état du collapse
  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}
