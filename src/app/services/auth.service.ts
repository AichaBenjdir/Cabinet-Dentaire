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

  login(email: string, password: string): Observable<any> {  // Changer le type de retour à 'any' pour récupérer l'utilisateur
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => {
        console.log("Données reçues :", users);
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));  // Stocke l'utilisateur complet dans 'currentUser'
          localStorage.setItem('authToken', 'fake-jwt-token');  // Simule un token d'authentification
          return { isAuthenticated: true, user };  // Retourner un objet contenant isAuthenticated et l'utilisateur
        }
        return { isAuthenticated: false };  // Si l'authentification échoue, renvoyer false
      }),
      catchError(error => {
        console.error("Erreur lors de la requête :", error);
        return of({ isAuthenticated: false });
      })
    );
  }
  
  
  // Méthode pour déconnecter l'utilisateur
  logout() {
    localStorage.removeItem('authToken'); // Supprimer le token
    this.router.navigate(['/login']); // Rediriger vers la page de connexion
  }
}
