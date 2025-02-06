import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Interface pour les utilisateurs
export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL de l'API JSON Server
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) { }

  // Vérifier si l'utilisateur est authentifié en utilisant un token
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token !== null;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => {
        console.log("Données reçues :", users);
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('authToken', 'fake-jwt-token');
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error("Erreur lors de la requête :", error);
        return of(false);
      })
    );
    
  }
  
  
  // Méthode pour déconnecter l'utilisateur
  logout() {
    localStorage.removeItem('authToken'); // Supprimer le token
    this.router.navigate(['/login']); // Rediriger vers la page de connexion
  }
}
