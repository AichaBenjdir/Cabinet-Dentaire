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
  
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe((response) => {
      if (response.isAuthenticated) {
        console.log('Connexion réussie');
        // Sauvegarder l'utilisateur dans le localStorage pour l'utiliser ailleurs
        localStorage.setItem('currentUser', JSON.stringify(response.user));  // Stocke l'utilisateur sous la clé 'currentUser'
        
        // Redirection vers le tableau de bord
        this.router.navigate(['/dashboard']);
      } else {
        console.error('Identifiants invalides');
        // Afficher un message d'erreur, si nécessaire
      }
    });
  }
  
}
