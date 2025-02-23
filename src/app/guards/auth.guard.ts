import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root' // Pour que ce guard soit accessible dans toute l'application
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
      // Vérifier si l'utilisateur est authentifié
      if (this.authService.isAuthenticated()) {
        return true; // L'utilisateur est authentifié, autoriser l'accès à la route
      } else {
        // L'utilisateur n'est pas authentifié, rediriger vers la page de login
        this.router.navigate(['/login']);
        return false; // Bloquer l'accès à la route
      }
  }
}
