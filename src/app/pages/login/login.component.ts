import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router) {}


  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        console.log('Connexion réussie');
        this.router.navigate(['/dashboard']);
        // Redirection vers une autre page après la connexion réussie
      } else {
        console.error('Identifiants invalides');
        // Afficher un message d'erreur, si nécessaire
      }
    });
  }
}