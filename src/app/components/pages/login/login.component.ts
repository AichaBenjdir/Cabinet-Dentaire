import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';  // Message d'erreur
  successMessage: string = ''; // Message de succès

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = ''; // Réinitialisation des messages
    this.successMessage = '';

    this.authService.login(this.email, this.password).subscribe((response) => {
      if (response.isAuthenticated) {
        console.log('Connexion réussie');
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        
        // Affichage du message de succès
        this.successMessage = 'Connexion réussie, redirection en cours...';

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000); // Rediriger après 2 secondes
      } else {
        console.error('Identifiants invalides');
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    }, (error) => {
      console.error('Erreur de connexion', error);
      this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
    });
  }
}
