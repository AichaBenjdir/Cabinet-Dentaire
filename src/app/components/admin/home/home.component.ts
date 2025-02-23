import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentUser: any;
  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser');
    this.isLoggedIn = !!storedUser;
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
  }

  logout() {
    localStorage.removeItem('currentUser'); 
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}


  // user_name = "Dr. Zied Benjdir";  // Exemple de nom d'utilisateur
  // imageUrl = "assets/c2.jpg";  // URL de l'image de profil

  // constructor(private router: Router) {}

  // logout() {
    
  //   sessionStorage.clear(); 

    
  //   this.router.navigate(['/login']);
  // }
//   constructor(private router: Router) {} 
//   isLoggedIn = false;

//   ngOnInit() {
//     this.isLoggedIn = !!localStorage.getItem('user');
//   }
  
//   logout() {
//     localStorage.removeItem('user'); // Suppression des infos utilisateur
//     this.router.navigate(['/login']); // Redirection vers la page publique
//   }
  
// }
