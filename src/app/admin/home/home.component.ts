import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // user_name = "Dr. Jean Dupont";  // Exemple de nom d'utilisateur
  // imageUrl = "assets/c2.jpg";  // URL de l'image de profil

  // constructor(private router: Router) {}

  // logout() {
    
  //   sessionStorage.clear(); 

    
  //   this.router.navigate(['/login']);
  // }
  constructor(private router: Router) {} 
  isLoggedIn = false;

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('user');
  }
  
  logout() {
    localStorage.removeItem('user'); // Suppression des infos utilisateur
    this.router.navigate(['/login']); // Redirection vers la page publique
  }
  
}
