import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cabinet-dentaire-';
  showLayout = true; // Permet d'afficher ou cacher le navbar et le footer

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);
      }
    });
  }

  private checkRoute(url: string): void {
    // Liste des routes privées où on cache le navbar et le footer
    const privateRoutes = ['/dashbord', '/ajouter-patients', '/appointments', '/liste-appointment', '/traitements'];

    // Vérifie si l'utilisateur est dans la partie privée
    this.showLayout = !privateRoutes.some(route => url.startsWith(route)) && url !== '/login';
  }
}