import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor() { }

  getDashboardData(): Observable<any> {
    // Remplace ceci par une véritable requête HTTP
    return of({
      patients: 100,
      rdvToday: 5,
      traitements: 15
    });
  }
}
