import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patients`).pipe(
      catchError(this.handleError)
    );
  }

  getRendezvous(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rendezVous`).pipe(
      catchError(this.handleError)
    );
  }

  getTraitements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/traitements`).pipe(
      catchError(this.handleError)
    );
  }

  getPatientsByMonth(): Observable<{ months: string[], patientCounts: number[] }> {
    return this.http.get<{ months: string[], patientCounts: number[] }>(`${this.apiUrl}/patients-by-month`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue :', error);
    return throwError(() => new Error('Une erreur s\'est produite, veuillez réessayer plus tard.'));
  }
}
